<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class NameUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255',Rule::unique(User::class)->ignore($this->user()->id),],
        ];
    }
    public function messages()
    {
        return [
            'name.unique' => 'Nazwa jest już zajęta',
            'name.required' => 'Nazwa jest wymagana',
            'name.string' => 'Nazwa musi być ciągiem znaków',
            'name.max' => 'Nazwa nie może być dłuższa niż 255 znaków',
        ];
    }
}
