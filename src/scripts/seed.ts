import { Pessoa, TipoPessoa } from '../person/models/entity/person.entity';
import { FuncionarioLogin } from '../employee-login/models/entity/employee-login.entity';
import { AppDataSource } from '../shared/config/typeorm.config';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  await AppDataSource.initialize();
  console.log('Conexao com banco iniciada');

  const personRepo = AppDataSource.getRepository(Pessoa);
  const loginRepo = AppDataSource.getRepository(FuncionarioLogin);

  const existingPerson = await personRepo.findOneBy({
    email: 'admin@farmacia.com',
  });

  let personId: number;

  if (existingPerson) {
    console.log('"Administrador" já existe');
    personId = existingPerson.id;
  } else {
    const newPerson = personRepo.create({
      name: 'Administrador',
      email: 'admin@farmacia.com',
      document: '00000000000',
      telephone: '11999999999',
      type: TipoPessoa.FUNCIONARIO,
    });

    const saved = await personRepo.save(newPerson);
    personId = saved.id;
    console.log('"Administrador" criado com sucesso');
  }

  const existingLogin = await loginRepo.findOneBy({ person: { id: personId } });
  if (existingLogin) {
    console.log('Login do administrador ja existe');
  } else {
    const hashed = await bcrypt.hash('admin', 10);
    const newLogin = loginRepo.create({
      person: { id: personId },
      login: 'admin',
      password: hashed,
      permissionLevel: 1,
    });
    await loginRepo.save(newLogin);
    console.log('Login criado com sucesso (login: admin)');
  }
  await AppDataSource.destroy();
  console.log('Seed executado com sucesso. Admin pronto para login.');
}

seed().catch((err) => {
  console.error('Erro durante seed:', err);
  AppDataSource.destroy();
});
