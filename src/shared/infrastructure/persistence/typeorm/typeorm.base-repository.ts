// src/shared/infrastructure/persistence/typeorm/base-typeorm.repository.ts
import { Repository, ObjectLiteral, EntityManager, In, SelectQueryBuilder, Brackets } from 'typeorm';
import { IBaseRepository } from '@src/shared/core/interfaces/repositories/base-repository.interface';
import { transactionStorage } from '@shared/infrastructure/persistence/typeorm/typeorm.transaction-context';
import { BaseMapper } from '@src/shared/infrastructure/persistence/base/base.mapper';
import { PaginatedOptions, PaginatedResult } from '@src/shared/core/interfaces/repositories/read-repository.interface';

export abstract class BaseTypeOrmRepository<
  TDomain,
  TEntity extends ObjectLiteral,
  ID = string | number,
> implements IBaseRepository<TDomain, ID> {
  constructor(
    protected readonly repository: Repository<TEntity>,
    protected readonly mapper: BaseMapper<TDomain, TEntity>,
  ) { }

  protected get entityRepository(): Repository<TEntity> {
    const entityManager = transactionStorage.getStore() as EntityManager;
    if (entityManager) {
      return entityManager.getRepository(this.repository.target);
    }
    return this.repository;
  }

  // CONSULTAS

  async findPaginated(options: PaginatedOptions): Promise<PaginatedResult<TDomain>> {
    const { page = 1, limit = 10, search, orderBy, orderDirection, filters, searchFields } = options;
    const offset = (page - 1) * limit;

    const alias = this.entityRepository.metadata.targetName.toLowerCase();

    const queryBuilder = this.entityRepository.createQueryBuilder(alias);

    if (orderBy) {
      const direction = orderDirection?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      queryBuilder.orderBy(`${alias}.${orderBy}`, direction);
    }

    if (search && search.trim() !== '') {
      const alias = queryBuilder.alias;
      const searchCondition = searchFields
        .map(field => `${alias}.${field} LIKE :search`)
        .join(' OR ');
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(searchCondition, { search: `%${search}%` });
        })
      );
    }

    this.applySearchAndFilters(queryBuilder, search, filters);

    const [ormEntities, total] = await queryBuilder
      .offset(offset)
      .limit(limit)
      .getManyAndCount();


    const items = this.mapper.toDomainList(ormEntities);

    return {
      items,
      pagination: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      }
    };
  }

  protected applySearchAndFilters(
    queryBuilder: SelectQueryBuilder<TEntity>,
    search?: string,
    filters?: Record<string, any>
  ): void {
    // Por defecto no hace nada. Se personaliza en cada repositorio específico.
  }

  async findAll(): Promise<TDomain[]> {
    const records = await this.entityRepository.find();
    return this.mapper.toDomainList(records);
  }

  async findAllByIds(ids: ID[]): Promise<TDomain[]> {
    const records = await this.entityRepository.find({
      where: { id: In(ids) } as any,
    });
    return this.mapper.toDomainList(records);
  }

  async findAllPaginated(
    limit: number,
    offset: number,
  ): Promise<{ rows: TDomain[]; count: number }> {
    // 1. Ejecutamos la consulta con paginación
    const [records, total] = await this.entityRepository.findAndCount({
      take: limit, // Cantidad de registros a traer
      skip: offset, // Cuántos registros saltar
      order: { id: 'ASC' } as any, // Es buena práctica ordenar siempre al paginar
    });

    // 2. Mapeamos los resultados de persistencia al dominio
    const domainEntities = this.mapper.toDomainList(records);

    return {
      rows: domainEntities,
      count: total,
    };
  }

  async findById(id: ID): Promise<TDomain | null> {
    // En TypeORM 0.3+, findOneBy es preferible para búsquedas simples por ID
    const record = await this.entityRepository.findOne({
      where: { id } as any,
    });
    return record ? this.mapper.toDomain(record) : null;
  }

  async checkIdsExistence(
    ids: ID[],
  ): Promise<{ existingIds: ID[]; missingIds: ID[] }> {
    const records = await this.entityRepository.findBy({
      id: In(ids) as any,
    });
    const existingIds = records.map((record) => (record as any).id as ID);
    const missingIds = ids.filter((id) => !existingIds.includes(id));
    return {
      existingIds,
      missingIds,
    };
  }

  async count(): Promise<number> {
    return await this.entityRepository.count();
  }

  // VALIDACIONES

  async exists(id: ID): Promise<boolean> {
    const record = await this.entityRepository.findOne({
      where: { id } as any,
    });
    return !!record;
  }

  async existsAll(ids: ID[]): Promise<boolean> {
    const count = await this.entityRepository.count({
      where: { id: ids } as any,
    });
    return count === ids.length;
  }



  // COMANDOS

  async save(entity: TDomain): Promise<void> {
    const persistenceModel = this.mapper.toPersistence(entity);
    // .save() en TypeORM maneja tanto inserción como actualización (si el ID existe)
    await this.entityRepository.save(persistenceModel);
  }

  async saveMany(entities: TDomain[]): Promise<void> {
    if (!entities || entities.length === 0) return;
    const persistenceEntities = this.mapper.toPersistenceList(entities);
    await this.entityRepository.save(persistenceEntities as any);
  }

  async update(id: ID, entity: Partial<TDomain>): Promise<void> {
    const record = await this.findById(id);
    if (!record) {
      throw new Error('Entity not found.');
    }
    const updatedDomain = Object.assign(record, entity);
    const persistenceModel = this.mapper.toPersistence(updatedDomain);
    await this.entityRepository.save(persistenceModel as any);
  }

  async delete(id: ID): Promise<void> {
    const record = await this.entityRepository.findOne({
      where: { id } as any,
    });
    if (!record) {
      throw new Error('Entity not found.');
    }
    await this.entityRepository.remove(record);
  }

  async deleteMany(ids: ID[]): Promise<void> {
    if (!ids || ids.length === 0) return;
    await this.entityRepository.delete({
      id: In(ids) as any,
    });
  }
}


