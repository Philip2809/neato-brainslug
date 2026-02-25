// entity-store.ts

import { entityConfig } from "./types";

class EntityStore {
  private entities = new Map<string, entityConfig>();
  private listeners = new Set<(entity: entityConfig) => void>();

  set(entity: entityConfig) {
    this.entities.set(entity.unique_id, entity);
    this.notify(entity);
  }

  get(entityId: string) {
    return this.entities.get(entityId);
  }

  subscribe(cb: (entity: entityConfig) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify(entity: entityConfig) {
    for (const cb of this.listeners) cb(entity);
  }
}

export const entityStore = new EntityStore();
