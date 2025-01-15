<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserBlocked extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public $name, public $email)
    {
        $this->email = $email;
        $this->name = $name;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Twoje konto zostało zablokowane')
            ->line("Witaj, {$this->name}.")
            ->line("Twoje konto o adresie email {$this->email} zostało zablokowane.")
            ->line('Dziękujemy za zrozumienie.');
    }

    public function toDatabase(object $notifiable)
    {
        return [
            'message' => 'Twoje konto zostało zablokowane.',
            'reason' => 'Naruszenie zasad regulaminu.',
            'blocked_at' => now(),
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
