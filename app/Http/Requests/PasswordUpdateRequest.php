<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends FormRequest
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
            'current_password' => ['required', 'current_password'],
            'password' => ['required','min:8', Password::defaults(), 'confirmed'],

        ];
    }
    public function messages(): array
    {
        return [
            'password.required' => 'Hasło jest wymagane.',
            'password.min' => 'Hasło musi zawierać przynajmniej 8 znaków.',
            'current_password' => 'Hasło niepoprawne.',
            'password.confirmed' => 'Hasła się nie zgadzają.',
        ];
    }
}
