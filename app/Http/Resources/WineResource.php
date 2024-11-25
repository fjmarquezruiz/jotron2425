<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'stock' => $this->stock,
            'year' => $this->year,
            'image' => $this->image,
            'description' => $this->description,
            'visual_tasting' => $this->visual_tasting,
            'aroma_tasting' => $this->aroma_tasting,
            'mouth_tasting' => $this->mouth_tasting,
            'capacity' => $this->capacity,
            'minimum_temperature' => $this->minimum_temperature,
            'maximum_temperature' => $this->maximum_temperature,
            'alcohol_content' => $this->alcohol_content,
            'pairing' => $this->pairing,
            'winery' => $this->assignedWinery ? new WineryResource($this->assignedWinery) : null,
            'block' => $this->block,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
