export abstract class MapperService<M, E> {
        
    abstract toEntity(model: M): E;
    abstract toModel(entity: E): M;

    public toEntityList(models: M[]): E[] {
        return models.map(model => this.toEntity(model));
    }
    public toModelList(entities: E[]): M[] {
        return entities.map(entity => this.toModel(entity));
    }
}