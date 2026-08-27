<?php

namespace App\Observers;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;

class LogsActivityObserver
{
    public function created(Model $model): void
    {
        $this->log('created', $model, "created {$this->label($model)}");
    }

    public function updated(Model $model): void
    {
        $changes = $model->getChanges();
        unset($changes['updated_at']);

        if (empty($changes)) {
            return;
        }

        $this->log('updated', $model, "updated {$this->label($model)}", $changes);
    }

    public function deleted(Model $model): void
    {
        $this->log('deleted', $model, "deleted {$this->label($model)}");
    }

    private function label(Model $model): string
    {
        $name = class_basename($model);
        $title = $model->title ?? $model->name ?? $model->email ?? "#{$model->getKey()}";

        return "{$name} \"{$title}\"";
    }

    private function log(string $action, Model $model, string $description, ?array $changes = null): void
    {
        $user = auth()->user();

        ActivityLog::create([
            'user_id' => $user?->id,
            'user_name' => $user?->name ?? 'System',
            'action' => $action,
            'subject_type' => class_basename($model),
            'subject_id' => $model->getKey(),
            'description' => $description,
            'changes' => $changes,
            'ip_address' => request()?->ip(),
        ]);
    }
}
