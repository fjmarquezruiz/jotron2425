<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWineryRequest;
use App\Http\Requests\UpdateWineryRequest;
use App\Http\Resources\WineResource;
use App\Http\Resources\WineryResource;
use App\Models\Winery;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WineryController extends Controller
{
    /**
     * Display a listing of the winery resources.
     *
     * This method retrieves a paginated list of wineries, allowing for optional
     * filtering by name, province, and block status. The results can be sorted
     * by a specified field and direction.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Initialize the query
        $query = Winery::query();

        // Get the sort field and direction from the request
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'asc');

        // Apply name filter if provided
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        // Apply province filter if provided
        if (request('province')) {
            $query->where('province', 'like', '%' . request('province') . '%');
        }

        // if (request('block')) {
        //     $query->where('block',  request('block'));
        // }

        // Apply block filter if provided
        if (request()->has('block')) {
            $blockValue = filter_var(request('block'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if ($blockValue !== null) {
                $query->where('block', $blockValue);
            }
        }

        // Order the results based on the specified sort field and direction
        // $wineries = $query->paginate(10)->onEachSide(1);
        $wineries = $query->orderBy($sortField, $sortDirection)->paginate(5);

        // Return the Inertia response with the winery data and query parameters
        // return Inertia::render("Winery/Index");
        return inertia("Winery/Index", [
            "wineries" => WineryResource::collection($wineries),
            "queryParams" => request()->query() ?: null,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia("Winery/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWineryRequest $request)
    {
        //
        $data = $request->validated();
        // dd($data);
        // $winery = Winery::create($data);

        // return to_route('winery.index')->with('success', 'Winery was created!');

        try {
            // Attempt to create a new winery record
            $winery = Winery::create($data);

            return to_route('winery.index')->with('success', 'Winery was created!');
        } catch (QueryException $e) {
            // Log the error message
            Log::error('Database error: ' . $e->getMessage());

            // Redirect back with an error message
            return back()->withErrors(['error' => 'There was an issue saving the winery. Please try again.']);
        }
    }

    /**
     * Display the specified winery along with its wines.
     *
     * This method retrieves the wines associated with the given winery,
     * applies optional filtering based on the wine name, and sorts the
     * results based on the specified sort field and direction. It then
     * paginates the results and returns a view with the winery and wines
     * data.
     *
     * @param Winery $winery The winery instance for which to show wines.
     *
     * @return \Inertia\Response The Inertia response containing the winery
     *                           and wines data.
     */
    public function show(Winery $winery)
    {
        // Retrieve the wines associated with the given winery
        $query = $winery->wines();

        // Get the sort field and direction from the request
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        // Apply filtering based on the wine name, if provided
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        // Order the wines based on the specified sort field and direction,
        // and paginate the results
        $wines = $query->orderBy($sortField, $sortDirection)->paginate(10);

        // Return the Inertia response with the winery and wines data
        return inertia('Winery/Show', [
            "winery" => new WineryResource($winery),
            "wines" => WineResource::collection($wines),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Winery $winery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWineryRequest $request, Winery $winery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Winery $winery)
    {
        //
    }
}
