import { UpdateSalesController } from './update-sales.controller';
import { UpdateSalesUseCase } from './update-sales.use-case';
import { UpdateSalesDTO } from 'src/sales/models/dtos/update-sales.dto';
import { Venda } from 'src/sales/models/entity/sales.entity';
import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

describe('UpdateSalesController', () => {
  let controller: UpdateSalesController;
  let mockUseCase: UpdateSalesUseCase;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    } as unknown as UpdateSalesUseCase;

    controller = new UpdateSalesController(mockUseCase);
  });

  it('deve atualizar e retornar a venda', async () => {
    const dto: UpdateSalesDTO = { cpf: '12345678900' } as UpdateSalesDTO;
    const vendaAtualizada: Venda = {
      id: 1,
      cpf: '12345678900',
      totalValue: 100,
      emissionDate: new Date(),
      itemSale: [],
      payments: undefined,
      employee: null,
    };

    (mockUseCase.update as jest.Mock).mockResolvedValue(vendaAtualizada);

    const result = await controller.update(1, dto);

    expect(result).toEqual(vendaAtualizada);
    expect(mockUseCase.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    const dto: UpdateSalesDTO = { cpf: '000' } as UpdateSalesDTO;

    await expect(controller.update('abc' as any, dto)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.update).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se a venda não for encontrada', async () => {
    const dto: UpdateSalesDTO = { cpf: 'teste' } as UpdateSalesDTO;

    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new NotFoundException(),
    );

    await expect(controller.update(999, dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockUseCase.update).toHaveBeenCalledWith(999, dto);
  });

  it('deve lançar InternalServerErrorException se a atualização falhar', async () => {
    const dto: UpdateSalesDTO = { cpf: 'erro' } as UpdateSalesDTO;

    (mockUseCase.update as jest.Mock).mockRejectedValue(
      new InternalServerErrorException(),
    );

    await expect(controller.update(1, dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
