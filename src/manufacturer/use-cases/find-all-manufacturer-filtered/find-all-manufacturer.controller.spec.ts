import { FindManufacturerDTO } from 'src/manufacturer/models/dtos/find-manufacturer.dto';
import { FindAllManufacturerController } from './find-all-manufacturer.controller';
import { Fabricante } from 'src/manufacturer/models/entity/manufacturer.entity';

describe('FindAllManufacturerController', () => {
  let controller: FindAllManufacturerController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    };

    controller = new FindAllManufacturerController(mockUseCase);
  });

  it('deve retornar fabricantes filtrados', async () => {
    const dto: FindManufacturerDTO = {
      name: 'Fiat',
      cnpj: '123456789',
      contact: 'contato@fiat.com',
      page: 1,
      quantity: 10,
    };

    const expectedResponse: Fabricante[] = [
      {
        id: 1,
        name: 'Fiat',
        cnpj: '123456789',
        contact: 'contato@fiat.com',
        products: [],
      },
    ];

    mockUseCase.find.mockResolvedValue(expectedResponse);

    const result = await controller.find(dto);

    expect(result).toEqual(expectedResponse);
    expect(mockUseCase.find).toHaveBeenCalledWith(dto);
  });

  it('deve lançar erro se o use case falhar', async () => {
    const dto: FindManufacturerDTO = {
      name: 'Fiat',
      page: 1,
      quantity: 10,
    };

    mockUseCase.find.mockRejectedValue(new Error('Erro interno'));

    await expect(controller.find(dto)).rejects.toThrow('Erro interno');
  });
});
