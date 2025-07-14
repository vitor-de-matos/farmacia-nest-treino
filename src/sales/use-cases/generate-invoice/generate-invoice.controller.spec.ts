import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { GenerateInvoiceController } from './generate-invoice.controller';
import { GenerateInvoiceUseCase } from './generate-invoice.use-case';
import { Venda } from 'src/sales/models/entity/sales.entity';

describe('GenerateInvoiceController', () => {
  let controller: GenerateInvoiceController;
  let mockUseCase: GenerateInvoiceUseCase;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as unknown as GenerateInvoiceUseCase;

    controller = new GenerateInvoiceController(mockUseCase);
  });

  it('deve retornar uma venda válida para nota fiscal', async () => {
    const venda: Venda = {
      id: 1,
      cpf: '12345678900',
      totalValue: 150,
      emissionDate: new Date(),
      itemSale: [],
      payments: undefined,
      employee: null,
    };

    (mockUseCase.find as jest.Mock).mockResolvedValue(venda);

    const result = await controller.find(1);

    expect(result).toEqual(venda);
    expect(mockUseCase.find).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotAcceptableException se o ID não for numérico', async () => {
    await expect(controller.find('abc' as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se a venda não for encontrada', async () => {
    (mockUseCase.find as jest.Mock).mockRejectedValue(new NotFoundException());

    await expect(controller.find(999)).rejects.toThrow(NotFoundException);
    expect(mockUseCase.find).toHaveBeenCalledWith(999);
  });
});
