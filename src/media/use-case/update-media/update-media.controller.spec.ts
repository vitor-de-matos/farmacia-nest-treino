import { UpdateMidiaDTO } from 'src/media/models/dtos/update-media.dto';
import { UpdateMidiaController } from './update-media.controller';
import { UpdateMidiaUseCase } from './update-media.use-case';
import { NotAcceptableException } from '@nestjs/common';

describe('UpdateMidiaController', () => {
  let controller: UpdateMidiaController;
  let mockUseCase: jest.Mocked<UpdateMidiaUseCase>;

  beforeEach(() => {
    mockUseCase = {
      update: jest.fn(),
    } as any;

    controller = new UpdateMidiaController(mockUseCase);
  });

  const updateDto: UpdateMidiaDTO = {
    name: 'Nova imagem',
    icon: true,
  };

  it('deve atualizar mídia com sucesso e retornar mensagem', async () => {
    mockUseCase.update.mockResolvedValue(undefined);

    const result = await controller.update(1, updateDto, undefined);

    expect(mockUseCase.update).toHaveBeenCalledWith(1, updateDto);
    expect(result).toBe('Midia atualizada');
  });

  it('deve atribuir arquivo ao DTO se presente', async () => {
    const file = {
      originalname: 'foto.jpg',
      buffer: Buffer.from('file'),
    } as Express.Multer.File;

    const dto = { ...updateDto };

    mockUseCase.update.mockResolvedValue(undefined);

    await controller.update(1, dto, file);

    expect(dto.archive).toBe(file);
    expect(mockUseCase.update).toHaveBeenCalledWith(1, dto);
  });

  it('deve lançar NotAcceptableException se id não for número', async () => {
    await expect(
      controller.update(NaN as any, updateDto, undefined),
    ).rejects.toThrow(NotAcceptableException);

    expect(mockUseCase.update).not.toHaveBeenCalled();
  });
});
