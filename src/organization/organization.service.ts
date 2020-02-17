import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class organizationService {

  constructor(
    @InjectRepository(OrganizationRepository)
    private readonly _OrganizationRepository: OrganizationRepository,
  ) { }

  async createOrganization(signupOrganization) {
    this._OrganizationRepository.save(signupOrganization)
  }
}
