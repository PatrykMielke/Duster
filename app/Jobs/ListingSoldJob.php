<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class ListingSoldJob implements ShouldQueue
{
    use Queueable;
    protected $user;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->user->notify(Mail::to($this->user->email)->send(new \App\Mail\ListingSold()));
    }
}
