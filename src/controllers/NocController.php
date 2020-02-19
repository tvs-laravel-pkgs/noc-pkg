<?php

namespace Abs\NocPkg;
use Abs\Basic\Attachment;
use Abs\NocPkg\Noc;
use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
use DB;
use File;
use Illuminate\Http\Request;
use Validator;
use Yajra\Datatables\Datatables;

class NocController extends Controller {

	private $company_id;
	public function __construct() {
		$this->data['theme'] = config('custom.admin_theme');
		$this->company_id = config('custom.company_id');
	}

	public function getNocs(Request $request) {
		$this->data['nocs'] = Noc::
			select([
			'nocs.question',
			'nocs.answer',
		])
			->where('nocs.company_id', $this->company_id)
			->orderby('nocs.display_order', 'asc')
			->get()
		;
		$this->data['success'] = true;

		return response()->json($this->data);

	}

	public function getNocList(Request $request) {
		$nocs = Noc::withTrashed()
			->join('noc_types','nocs.type_id','=','noc_types.id')
			->select([
				'nocs.*',
				//DB::raw('IF(nocs.deleted_at IS NULL, "Active","Inactive") as status'),
			])
			->where('nocs.company_id', $this->company_id)
		/*->where(function ($query) use ($request) {
				if (!empty($request->question)) {
					$query->where('nocs.question', 'LIKE', '%' . $request->question . '%');
				}
			})*/
			->orderby('nocs.id', 'desc');

		return Datatables::of($nocs)
			->addColumn('name', function ($nocs) {
				$status = $nocs->status == 'Active' ? 'green' : 'red';
				return '<span class="status-indicator ' . $status . '"></span>' . $nocs->name;
			})
			->addColumn('action', function ($nocs) {
				$img1 = asset('public/themes/' . $this->data['theme'] . '/img/content/table/edit-yellow.svg');
				$img1_active = asset('public/themes/' . $this->data['theme'] . '/img/content/table/edit-yellow-active.svg');
				$img_delete = asset('public/themes/' . $this->data['theme'] . '/img/content/table/delete-default.svg');
				$img_delete_active = asset('public/themes/' . $this->data['theme'] . '/img/content/table/delete-active.svg');
				$output = '';
				$output .= '<a href="#!/noc-pkg/noc/edit/' . $nocs->id . '" id = "" ><img src="' . $img1 . '" alt="Edit" class="img-responsive" onmouseover=this.src="' . $img1_active . '" onmouseout=this.src="' . $img1 . '"></a>
					<a href="javascript:;" data-toggle="modal" data-target="#noc-delete-modal" onclick="angular.element(this).scope().deleteNoc(' . $nocs->id . ')" title="Delete"><img src="' . $img_delete . '" alt="Delete" class="img-responsive delete" onmouseover=this.src="' . $img_delete_active . '" onmouseout=this.src="' . $img_delete . '"></a>
					';
				return $output;
			})
			->make(true);
	}

	public function getNocFormData(Request $r) {
		$id = $r->id;
		if (!$id) {
			$noc = new Noc;
			$attachment = new Attachment;
			$action = 'Add';
		} else {
			$noc = Noc::withTrashed()->find($id);
			$attachment = Attachment::where('id', $noc->logo_id)->first();
			$action = 'Edit';
		}
		$this->data['noc'] = $noc;
		$this->data['attachment'] = $attachment;
		$this->data['action'] = $action;
		$this->data['theme'];

		return response()->json($this->data);
	}

	public function saveNoc(Request $request) {
		//dd($request->all());
		try {
			$error_messages = [
				'name.required' => 'Name is Required',
				'name.unique' => 'Name is already taken',
				'delivery_time.required' => 'Delivery Time is Required',
				'charge.required' => 'Charge is Required',
			];
			$validator = Validator::make($request->all(), [
				'name' => [
					'required:true',
					'unique:nocs,name,' . $request->id . ',id,company_id,' . Auth::user()->company_id,
				],
				'delivery_time' => 'required',
				'charge' => 'required',
				'logo_id' => 'mimes:jpeg,jpg,png,gif,ico,bmp,svg|nullable|max:10000',
			], $error_messages);
			if ($validator->fails()) {
				return response()->json(['success' => false, 'errors' => $validator->errors()->all()]);
			}

			DB::beginTransaction();
			if (!$request->id) {
				$noc = new Noc;
				$noc->created_by_id = Auth::user()->id;
				$noc->created_at = Carbon::now();
				$noc->updated_at = NULL;
			} else {
				$noc = Noc::withTrashed()->find($request->id);
				$noc->updated_by_id = Auth::user()->id;
				$noc->updated_at = Carbon::now();
			}
			$noc->fill($request->all());
			$noc->company_id = Auth::user()->company_id;
			if ($request->status == 'Inactive') {
				$noc->deleted_at = Carbon::now();
				$noc->deleted_by_id = Auth::user()->id;
			} else {
				$noc->deleted_by_id = NULL;
				$noc->deleted_at = NULL;
			}
			$noc->save();

			if (!empty($request->logo_id)) {
				if (!File::exists(public_path() . '/themes/' . config('custom.admin_theme') . '/img/noc_logo')) {
					File::makeDirectory(public_path() . '/themes/' . config('custom.admin_theme') . '/img/noc_logo', 0777, true);
				}

				$attacement = $request->logo_id;
				$remove_previous_attachment = Attachment::where([
					'entity_id' => $request->id,
					'attachment_of_id' => 20,
				])->first();
				if (!empty($remove_previous_attachment)) {
					$remove = $remove_previous_attachment->forceDelete();
					$img_path = public_path() . '/themes/' . config('custom.admin_theme') . '/img/noc_logo/' . $remove_previous_attachment->name;
					if (File::exists($img_path)) {
						File::delete($img_path);
					}
				}
				$random_file_name = $noc->id . '_noc_file_' . rand(0, 1000) . '.';
				$extension = $attacement->getClientOriginalExtension();
				$attacement->move(public_path() . '/themes/' . config('custom.admin_theme') . '/img/noc_logo', $random_file_name . $extension);

				$attachment = new Attachment;
				$attachment->company_id = Auth::user()->company_id;
				$attachment->attachment_of_id = 20; //User
				$attachment->attachment_type_id = 40; //Primary
				$attachment->entity_id = $noc->id;
				$attachment->name = $random_file_name . $extension;
				$attachment->save();
				$noc->logo_id = $attachment->id;
				$noc->save();
			}

			DB::commit();
			if (!($request->id)) {
				return response()->json([
					'success' => true,
					'message' => 'NOC Added Successfully',
				]);
			} else {
				return response()->json([
					'success' => true,
					'message' => 'NOC Updated Successfully',
				]);
			}
		} catch (Exceprion $e) {
			DB::rollBack();
			return response()->json([
				'success' => false,
				'error' => $e->getMessage(),
			]);
		}
	}

	public function deleteNoc(Request $request) {
		DB::beginTransaction();
		try {
			$noc = Noc::withTrashed()->where('id', $request->id)->first();
			if (!is_null($noc->logo_id)) {
				Attachment::where('company_id', Auth::user()->company_id)->where('attachment_of_id', 20)->where('entity_id', $request->id)->forceDelete();
			}
			Noc::withTrashed()->where('id', $request->id)->forceDelete();

			DB::commit();
			return response()->json(['success' => true, 'message' => 'NOC Deleted Successfully']);
		} catch (Exception $e) {
			DB::rollBack();
			return response()->json(['success' => false, 'errors' => ['Exception Error' => $e->getMessage()]]);
		}
	}
}
