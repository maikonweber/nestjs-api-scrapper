import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';

@Injectable()
export class OrderService {
    constructor(private readonly prismaService: PrismaService) {

    }

    async create(buy_values) {
        return this.prismaService.testOrder.create({
            data: {
                buy_values: buy_values,
                open: true,
                sell_values: 0.0,
                close: new Date()
            }
        })
    }

    async updateOrder(sell_values, id) {
        return this.prismaService.testOrder.update({
            where: {
                id: id
            },
            data: {
                sell_values: sell_values,
                open: false,
                close: new Date()
            }
        })
    }

    async getLastOpenTrue() {
        return this.prismaService.testOrder.findFirst(
            {
                where: {
                    open: true
                }
            }
        )
    }

}
