import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalesRepDto } from './dto/createSalesRepDto';
import { UpdateSalesRepDto } from './dto/updateSalesRepDto';
import { SalesRep } from './entities/salesRepEntity';
import { UsersService } from 'src/users/usersService';

@Injectable()
export class SalesRepsService {
  constructor(
    @InjectRepository(SalesRep) private salesRepRepo: Repository<SalesRep>,
    private usersService: UsersService,
  ) {}

  async create(createSalesRepDto: CreateSalesRepDto) {
    try {
      const { username, email, password, teamId } = createSalesRepDto;
      const sales_rep = {
        username,
        email,
        password,
        role: 'sales_rep',
        status: 'pending',
      };

      const user: any = await this.usersService.create(sales_rep);

      if (!user.success) {
        return {
          success: false,
          message: user.message,
        };
      }

      const salesRep = await this.salesRepRepo.create({
        userId: user.user.id,
        teamId,
      });
      await this.salesRepRepo.save(salesRep);

      return {
        success: true,
        data: salesRep,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async findAll() {
    try {
      return {
        success: true,
        data: await this.salesRepRepo.find(),
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async findOne(id: string) {
    try {
      return {
        success: true,
        data: await this.salesRepRepo.findOne(id),
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async findAllByPayload(payload: any) {
    try {
      const { userId, teamId } = payload;

      const data = await this.salesRepRepo
        .createQueryBuilder('salesRep')
        .leftJoinAndSelect('salesRep.user', 'user')
        .leftJoinAndSelect('salesRep.team', 'team')
        // .innerJoinAndMapOne('key.user', User, 'user', 'key.id = user.keyId')
        .where('salesRep.userId = :userId', { userId })
        .where('salesRep.teamId = :teamId', { teamId })
        .getMany();

      return {
        success: true,
        data,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async update(id: string, updateSalesRepDto: UpdateSalesRepDto) {
    try {
      const { userId, email, username } = updateSalesRepDto;

      const updatedUser = { email, username };

      await this.usersService.update(userId, updatedUser);

      return {
        success: true,
        data: await this.usersService.findOne(userId),
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }

  async remove(params: any) {
    try {
      const { id, userId } = params;

      await this.usersService.delete(userId);
      const result = await this.salesRepRepo.delete({ id });

      return {
        success: true,
        data: result,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  }
}
