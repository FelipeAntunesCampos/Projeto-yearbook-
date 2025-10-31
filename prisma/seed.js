import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Dados dos 101 alunos (46 H / 55 M)
const dadosAlunos = [
  {
    nome: "Carolina Pires Matos",
    email: "carolina.p.matos@aluno.com.br",
    matricula: "2025F101",
    biografia:
      "Meu sonho é ser astrofísica e entender a composição dos planetas. **Engenharia** Espacial é meu foco.",
  },
  {
    nome: "João Lucas Silva",
    email: "joao.lucas.s@aluno.com.br",
    matricula: "2025M001",
    biografia:
      "Futuro **engenheiro** de **software**, apaixonado por IA e filmes de ficção científica.",
  },
  {
    nome: "Jéssica Morais Souza",
    email: "jessica.m.souza@aluno.com.br",
    matricula: "2025F100",
    biografia:
      "Estudante de biblioteconomia. Interesso-me por **história** dos livros e acervos.",
  },
  {
    nome: "Vitor Hugo Pereira",
    email: "vitor.h.pereira@aluno.com.br",
    matricula: "2025M018",
    biografia:
      "Em busca de se tornar um grande **historiador**, com foco em arqueologia.",
  },
  {
    nome: "Gisele Martins Alves",
    email: "gisele.m.alves@aluno.com.br",
    matricula: "2025F098",
    biografia: "Focada em **saúde**, **nutrição** e treinamento funcional.",
  },
  {
    nome: "Pedro Henrique Lima",
    email: "pedro.h.lima@aluno.com.br",
    matricula: "2025M002",
    biografia:
      "Adoro **tecnologia** vestível e sempre busco soluções criativas em **engenharia**.",
  },
  {
    nome: "Priscila Cunha Rocha",
    email: "priscila.c.rocha@aluno.com.br",
    matricula: "2025F097",
    biografia:
      "Estudante de geologia. As rochas contam a **história** da Terra.",
  },
  {
    nome: "Gabriel Santos Alves",
    email: "gabriel.s.alves@aluno.com.br",
    matricula: "2025M003",
    biografia: "Músico nas horas vagas e dedicado estudante de **economia**.",
  },
  {
    nome: "Paula Ribeiro Barbosa",
    email: "paula.r.barbosa@aluno.com.br",
    matricula: "2025F096",
    biografia: "Adoro pintura a óleo e restauro de obras de **arte**.",
  },
  {
    nome: "Maria Eduarda Souza",
    email: "maria.e.souza@aluno.com.br",
    matricula: "2025F047",
    biografia:
      "Futura **médica**, com foco em pediatria. Meu sonho é cuidar de quem precisa.",
  },
  {
    nome: "Matheus Oliveira Costa",
    email: "matheus.o.costa@aluno.com.br",
    matricula: "2025M004",
    biografia: "Entusiasta de **história** antiga. 'Conhecimento é poder'.",
  },
  {
    nome: "Vanessa Lima Santos",
    email: "vanessa.l.santos@aluno.com.br",
    matricula: "2025F095",
    biografia: "Praticante de corrida de rua e estudante de **nutrição**.",
  },
  {
    nome: "Lucas Ferreira Rocha",
    email: "lucas.f.rocha@aluno.com.br",
    matricula: "2025M005",
    biografia:
      "Gamer profissional em ascensão e amante de pizza. Foco em **tecnologia** de jogos.",
  },
  {
    nome: "Denise Alves Teixeira",
    email: "denise.a.teixeira@aluno.com.br",
    matricula: "2025F094",
    biografia: "Interessada em **direito** ambiental e sustentabilidade.",
  },
  {
    nome: "Rafael Souza Pereira",
    email: "rafael.s.pereira@aluno.com.br",
    matricula: "2025M006",
    biografia:
      "Meu hobby é **fotografia**. Em busca da foto perfeita e de um bom livro.",
  },
  {
    nome: "Monique Oliveira Neves",
    email: "monique.o.neves@aluno.com.br",
    matricula: "2025F093",
    biografia:
      "Focada em análises de dados e estatística. Uso intensivo de **tecnologia**.",
  },
  {
    nome: "Ana Júlia Pereira",
    email: "ana.j.pereira@aluno.com.br",
    matricula: "2025F048",
    biografia:
      "Entusiasta de idiomas e culturas. Buscando a fluência e a conexão global. Foco em **história** cultural.",
  },
  {
    nome: "Daniel Martins Ribeiro",
    email: "daniel.m.ribeiro@aluno.com.br",
    matricula: "2025M007",
    biografia:
      "Voluntário em ONGs e defensor do meio ambiente. Foco em **direito**.",
  },
  {
    nome: "Amanda Costa Pinto",
    email: "amanda.c.pinto@aluno.com.br",
    matricula: "2025F092",
    biografia:
      "Foco em **nutrição** e bem-estar. **Saúde** integral é meu objetivo.",
  },
  {
    nome: "Gustavo Almeida Gomes",
    email: "gustavo.a.gomes@aluno.com.br",
    matricula: "2025M008",
    biografia:
      "Praticante de xadrez e fã de documentários. Interesse em **economia** global.",
  },
  {
    nome: "Tainá Ferreira Gomes",
    email: "taina.f.gomes@aluno.com.br",
    matricula: "2025F091",
    biografia:
      "Estudante de pedagogia. Acredito na força da **educação** para transformar.",
  },
  {
    nome: "Felipe Cunha Barbosa",
    email: "felipe.c.barbosa@aluno.com.br",
    matricula: "2025M009",
    biografia:
      "**Programador** novato, sempre aprendendo. Sonho em lançar meu próprio app.",
  },
  {
    nome: "Roberta Campos Melo",
    email: "roberta.c.melo@aluno.com.br",
    matricula: "2025F090",
    biografia:
      "Meu hobby é o canto e a composição **musical**. Faço **arte** com letras.",
  },
  {
    nome: "Laura Vitória Gomes",
    email: "laura.v.gomes@aluno.com.br",
    matricula: "2025F049",
    biografia:
      "**Programadora** front-end. Adoro transformar ideias em interfaces bonitas usando **tecnologia**.",
  },
  {
    nome: "Enzo Cardoso Pinto",
    email: "enzo.c.pinto@aluno.com.br",
    matricula: "2025M010",
    biografia:
      "Atleta de natação, foco e disciplina são minhas marcas. **Saúde** e esporte.",
  },
  {
    nome: "Bárbara Viana Dias",
    email: "barbara.v.dias@aluno.com.br",
    matricula: "2025F089",
    biografia:
      "Focada em recursos humanos e gestão de pessoas. Estudo **psicologia** e **sociologia**.",
  },
  {
    nome: "Léo Vinícius Freitas",
    email: "leo.v.freitas@aluno.com.br",
    matricula: "2025M011",
    biografia:
      "Aventureiro de fim de semana, escalando montanhas. Foco em **engenharia** de materiais.",
  },
  {
    nome: "Jéssica Souza Pires",
    email: "jessica.s.pires@aluno.com.br",
    matricula: "2025F088",
    biografia:
      "Apaixonada por **tecnologia** e cibersegurança. O futuro é digital.",
  },
  {
    nome: "Bruno Eduardo Gomes",
    email: "bruno.e.gomes@aluno.com.br",
    matricula: "2025M012",
    biografia:
      "Sempre buscando a perfeição na **engenharia** civil. O detalhe faz a diferença.",
  },
  {
    nome: "Natália Matos Lemos",
    email: "natalia.m.lemos@aluno.com.br",
    matricula: "2025F087",
    biografia:
      "Fotógrafa de eventos e estudante de **comunicação** e **arte**.",
  },
  {
    nome: "Thiago Morais Santos",
    email: "thiago.m.santos@aluno.com.br",
    matricula: "2025M013",
    biografia:
      "Leitor assíduo de **filosofia** e entusiasta de debates. **História** do pensamento.",
  },
  {
    nome: "Renata Barbosa Reis",
    email: "renata.b.reis@aluno.com.br",
    matricula: "2025F086",
    biografia: "Estudante de **engenharia** civil. Calculista e focada.",
  },
  {
    nome: "Beatriz Helena Santos",
    email: "beatriz.h.santos@aluno.com.br",
    matricula: "2025F050",
    biografia:
      "Focada em **biotecnologia** e pesquisa em laboratório. **Saúde** e ciência.",
  },
  {
    nome: "Samuel Henrique Reis",
    email: "samuel.h.reis@aluno.com.br",
    matricula: "2025M014",
    biografia:
      "Apaixonado por culinária, adora experimentar novas receitas. Foco em **gastronomia** e **arte**.",
  },
  {
    nome: "Viviane Lima Costa",
    email: "viviane.l.costa@aluno.com.br",
    matricula: "2025F085",
    biografia: "Focada em química industrial e **engenharia** química.",
  },
  {
    nome: "Arthur Miguel Fernandes",
    email: "arthur.m.fernandes@aluno.com.br",
    matricula: "2025M015",
    biografia:
      "Estudante de **direito** com foco em questões sociais. Justiça é a meta.",
  },
  {
    nome: "Patrícia Alves Souza",
    email: "patricia.a.souza@aluno.com.br",
    matricula: "2025F084",
    biografia:
      "Meu foco é a arqueologia e **história** antiga. Desvendar o passado.",
  },
  {
    nome: "Davi Lucca Nascimento",
    email: "davi.l.nascimento@aluno.com.br",
    matricula: "2025M016",
    biografia:
      "Fã de **música** eletrônica e **design** gráfico. **Arte** digital.",
  },
  {
    nome: "Camila Queiroz Ramos",
    email: "camila.q.ramos@aluno.com.br",
    matricula: "2025F083",
    biografia:
      "Ativista social e estudante de **sociologia**. Mudança e impacto.",
  },
  {
    nome: "Igor Cordeiro Dias",
    email: "igor.c.dias@aluno.com.br",
    matricula: "2025M017",
    biografia:
      "Foco em **tecnologia** e inovações. Busco sempre estar à frente em **engenharia**.",
  },
  {
    nome: "Fernanda Dias Silva",
    email: "fernanda.d.silva@aluno.com.br",
    matricula: "2025F082",
    biografia:
      "Estudante de **publicidade** e propaganda. Criatividade e **arte** visual.",
  },
  {
    nome: "Júlia Camila Ribeiro",
    email: "julia.c.ribeiro@aluno.com.br",
    matricula: "2025F051",
    biografia:
      "Dedicada estudante de biologia marinha. O oceano é a minha paixão. Foco em **saúde** e ecossistemas.",
  },
  {
    nome: "Guilherme Rocha Santos",
    email: "guilherme.r.santos@aluno.com.br",
    matricula: "2025M019",
    biografia:
      "Dedicação total aos estudos e ao time de futebol. Foco em **educação** física e **saúde**.",
  },
  {
    nome: "Daniela Cunha Melo",
    email: "daniela.c.melo@aluno.com.br",
    matricula: "2025F081",
    biografia:
      "Viajante de mochila nas costas. O mundo é a minha sala de aula. **História** e culturas.",
  },
  {
    nome: "Carlos Alberto Nunes",
    email: "carlos.a.nunes@aluno.com.br",
    matricula: "2025M020",
    biografia:
      "Aprendiz de línguas estrangeiras. Foco em **história** e diplomacia.",
  },
  {
    nome: "Sabrina Lemos Santos",
    email: "sabrina.l.santos@aluno.com.br",
    matricula: "2025F080",
    biografia:
      "Focada em **neurociência**. A complexidade da **saúde** mental.",
  },
  {
    nome: "Ricardo Melo Teixeira",
    email: "ricardo.m.teixeira@aluno.com.br",
    matricula: "2025M021",
    biografia:
      "Meu objetivo é a excelência acadêmica. Estudo de **economia** e **finanças**.",
  },
  {
    nome: "Stella Barros Ribeiro",
    email: "stella.b.ribeiro@aluno.com.br",
    matricula: "2025F079",
    biografia:
      "Amo teatro e busco ser uma grande atriz. **Arte** dramática e **cinema**.",
  },
  {
    nome: "Alex Pires Barbosa",
    email: "alex.p.barbosa@aluno.com.br",
    matricula: "2025M022",
    biografia:
      "Focado em entrar na área de energia renovável. **Engenharia** ambiental.",
  },
  {
    nome: "Elisa Farias Neves",
    email: "elisa.f.neves@aluno.com.br",
    matricula: "2025F078",
    biografia:
      "Meu hobby é a escrita criativa. Futura **jornalista** ou escritora de **arte**.",
  },
  {
    nome: "Giovanna Lemos Alves",
    email: "giovanna.l.alves@aluno.com.br",
    matricula: "2025F052",
    biografia:
      "Atleta de vôlei e leitora voraz de fantasia. Foco em **nutrição** e **saúde**.",
  },
  {
    nome: "Paulo Roberto Cruz",
    email: "paulo.r.cruz@aluno.com.br",
    matricula: "2025M023",
    biografia:
      "Interessado em política e geopolítica. Estudo de **sociologia** e **história**.",
  },
  {
    nome: "Letícia Pires Nunes",
    email: "leticia.p.nunes@aluno.com.br",
    matricula: "2025F077",
    biografia:
      "Estudante de farmácia, com foco em fitoterapia. **Saúde** natural.",
  },
  {
    nome: "Júlio César Dias",
    email: "julio.c.dias@aluno.com.br",
    matricula: "2025M024",
    biografia: "Ciclista amador e apreciador de **arte** contemporânea.",
  },
  {
    nome: "Helena Rocha Soares",
    email: "helena.r.soares@aluno.com.br",
    matricula: "2025F076",
    biografia: "Foco em energia eólica e **engenharia** ambiental.",
  },
  {
    nome: "Marcelo Gonçalves Pinto",
    email: "marcelo.g.pinto@aluno.com.br",
    matricula: "2025M025",
    biografia:
      "Fascinado por foguetes e exploração espacial. **Tecnologia** aeroespacial.",
  },
  {
    nome: "Alícia Costa Alves",
    email: "alicia.c.alves@aluno.com.br",
    matricula: "2025F075",
    biografia:
      "Praticante de ioga e meditação. Focada em **saúde** e bem-estar.",
  },
  {
    nome: "Isadora Rosa Dias",
    email: "isadora.r.dias@aluno.com.br",
    matricula: "2025F053",
    biografia:
      "Meu hobby é jardinagem e meu foco é a sustentabilidade. **Engenharia** florestal.",
  },
  {
    nome: "André Luiz Correia",
    email: "andre.l.correia@aluno.com.br",
    matricula: "2025M026",
    biografia:
      "Amante da natureza e trilhas. Foco em **geografia** e **história**.",
  },
  {
    nome: "Nicole Mendes Dantas",
    email: "nicole.m.dantas@aluno.com.br",
    matricula: "2025F074",
    biografia:
      "Apaixonada por **cinema** e crítica de filmes. **Arte** e **comunicação**.",
  },
  {
    nome: "Eduardo Ramos Costa",
    email: "eduardo.r.costa@aluno.com.br",
    matricula: "2025M027",
    biografia:
      "Estudante de **arquitetura**, sempre desenhando o futuro. Foco em **design**.",
  },
  {
    nome: "Lívia Gomes Ferreira",
    email: "livia.g.ferreira@aluno.com.br",
    matricula: "2025F073",
    biografia:
      "Estudante de **arquitetura** paisagística. **Design** e natureza.",
  },
  {
    nome: "Leandro Xavier Melo",
    email: "leandro.x.melo@aluno.com.br",
    matricula: "2025M028",
    biografia:
      "Focado em ser o melhor em tudo que faz. Estudo de **direito** e carreira.",
  },
  {
    nome: "Evelyn Alencar Brito",
    email: "evelyn.a.brito@aluno.com.br",
    matricula: "2025F072",
    biografia: "Dedicação total à pesquisa em genômica. **Saúde** e genética.",
  },
  {
    nome: "Manuella Ferreira Rocha",
    email: "manuella.f.rocha@aluno.com.br",
    matricula: "2025F054",
    biografia: "Apaixonada por **música** clássica e teatro. **Arte** cênica.",
  },
  {
    nome: "Diego Batista Souza",
    email: "diego.b.souza@aluno.com.br",
    matricula: "2025M029",
    biografia: "Fã de carros antigos e **engenharia** **mecânica**.",
  },
  {
    nome: "Brenda Dias Correia",
    email: "brenda.d.correia@aluno.com.br",
    matricula: "2025F071",
    biografia:
      "Amo matemática e estou focada em atuária. Uso de **tecnologia** estatística.",
  },
  {
    nome: "Renan Ferreira Gomes",
    email: "renan.f.gomes@aluno.com.br",
    matricula: "2025M030",
    biografia:
      "Tenista e estudante dedicado. Vencer é o foco. **Saúde** e performance.",
  },
  {
    nome: "Clara Barbosa Ramos",
    email: "clara.b.ramos@aluno.com.br",
    matricula: "2025F070",
    biografia:
      "Voluntária em abrigos de idosos. Foco em **serviço** **social** e **sociologia**.",
  },
  {
    nome: "Márcio Silveira Dias",
    email: "marcio.s.dias@aluno.com.br",
    matricula: "2025M031",
    biografia:
      "Gosto de **história** da **tecnologia** e sou um resolvedor de problemas.",
  },
  {
    nome: "Milena Morais Pires",
    email: "milena.m.pires@aluno.com.br",
    matricula: "2025F069",
    biografia: "Focada em **robótica** e **engenharia** mecatrônica.",
  },
  {
    nome: "Larissa Pires Barbosa",
    email: "larissa.p.barbosa@aluno.com.br",
    matricula: "2025F055",
    biografia:
      "Estudante de **jornalismo**, sempre em busca da verdade. **Comunicação** e **arte**.",
  },
  {
    nome: "Fábio Queiroz Neves",
    email: "fabio.q.neves@aluno.com.br",
    matricula: "2025M032",
    biografia:
      "Meu propósito é entender o comportamento humano. Foco em **psicologia** e **sociologia**.",
  },
  {
    nome: "Elisa Cunha Vieira",
    email: "elisa.c.vieira@aluno.com.br",
    matricula: "2025F068",
    biografia:
      "Focada em sustentabilidade e energias limpas. **Engenharia** ambiental.",
  },
  {
    nome: "Bruno César Lemos",
    email: "bruno.c.lemos@aluno.com.br",
    matricula: "2025M033",
    biografia:
      "Empreendedor nato. Sempre buscando a próxima grande ideia em **economia**.",
  },
  {
    nome: "Isabela Souza Matos",
    email: "isabela.s.matos@aluno.com.br",
    matricula: "2025F067",
    biografia:
      "Estudante de relações internacionais. Foco em **história** e política.",
  },
  {
    nome: "Otávio Augusto Santos",
    email: "otavio.a.santos@aluno.com.br",
    matricula: "2025M034",
    biografia:
      "Foco em **finanças** e mercado de ações. **Economia** e investimentos.",
  },
  {
    nome: "Heloísa Castro Lemos",
    email: "heloisa.c.lemos@aluno.com.br",
    matricula: "2025F066",
    biografia:
      "Meu passatempo é a culinária gourmet. **Arte** e **gastronomia**.",
  },
  {
    nome: "Alice Castro Pinto",
    email: "alice.c.pinto@aluno.com.br",
    matricula: "2025F056",
    biografia:
      "Focada em **design** de interiores e **arquitetura**. **Arte** espacial.",
  },
  {
    nome: "Murilo Dantas Xavier",
    email: "murilo.d.xavier@aluno.com.br",
    matricula: "2025M035",
    biografia: "Adoro jazz e literatura clássica. **Música** e **história**.",
  },
  {
    nome: "Valentina Rocha Neves",
    email: "valentina.r.neves@aluno.com.br",
    matricula: "2025F065",
    biografia: "Apreciadora de **arte** plásticas e **história** da **arte**.",
  },
  {
    nome: "Caio Roberto Silva",
    email: "caio.r.silva@aluno.com.br",
    matricula: "2025M036",
    biografia:
      "Estudante de **medicina** **veterinária**, meu amor pelos animais é imenso. Foco em **saúde** animal.",
  },
  {
    nome: "Rebeca Toledo Melo",
    email: "rebeca.t.melo@aluno.com.br",
    matricula: "2025F064",
    biografia:
      "Amante de animais e futura **veterinária** de grandes portes. **Saúde** e cuidado.",
  },
  {
    nome: "Hugo Emanuel Teixeira",
    email: "hugo.e.teixeira@aluno.com.br",
    matricula: "2025M037",
    biografia:
      "**Desenvolvedor** web e fã de cultura pop. **Tecnologia** para todos.",
  },
  {
    nome: "Eloá Guedes Matos",
    email: "eloa.g.matos@aluno.com.br",
    matricula: "2025F063",
    biografia: "Foco em **saúde** pública e epidemiologia. Ciência e cuidado.",
  },
  {
    nome: "Leonardo Pires Gomes",
    email: "leonardo.p.gomes@aluno.com.br",
    matricula: "2025M038",
    biografia:
      "Amo viajar e busco uma carreira que me permita conhecer o mundo. Estudo de **economia**.",
  },
  {
    nome: "Luiza Menezes Xavier",
    email: "luiza.m.xavier@aluno.com.br",
    matricula: "2025F062",
    biografia:
      "Focada em **marketing** digital e **branding**. **Comunicação** e **tecnologia**.",
  },
  {
    nome: "Mariana Silva Lima",
    email: "mariana.s.lima@aluno.com.br",
    matricula: "2025F057",
    biografia:
      "Meu objetivo é a pesquisa científica em **física**. **Engenharia** e **tecnologia**.",
  },
  {
    nome: "Elias Fernando Costa",
    email: "elias.f.costa@aluno.com.br",
    matricula: "2025M039",
    biografia:
      "Meu passatempo é a **astronomia**. Sempre olhando para as estrelas. **Ciência** e **história**.",
  },
  {
    nome: "Cecília Farias Reis",
    email: "cecilia.f.reis@aluno.com.br",
    matricula: "2025F061",
    biografia:
      "Adoro viajar e conhecer novos lugares. Foco em **turismo** e **história** local.",
  },
  {
    nome: "Rômulo César Pinto",
    email: "romulo.c.pinto@aluno.com.br",
    matricula: "2025M040",
    biografia:
      "Gosta de debates e de explorar novas ideias. Estudo de **direito** e **sociologia**.",
  },
  {
    nome: "Yasmin Santos Dias",
    email: "yasmin.s.dias@aluno.com.br",
    matricula: "2025F060",
    biografia:
      "Estudante de **moda** e estilista amadora. **Arte** e **design**.",
  },
  {
    nome: "Vinícius Ribeiro Alves",
    email: "vinicius.r.alves@aluno.com.br",
    matricula: "2025M041",
    biografia:
      "**Artista** plástico e estudante de **moda**. Foco em **arte** visual.",
  },
  {
    nome: "Emilly Nunes Correia",
    email: "emilly.n.correia@aluno.com.br",
    matricula: "2025F059",
    biografia: "Dedicada à área de **tecnologia** da informação e redes.",
  },
  {
    nome: "Wesley Santos Dias",
    email: "wesley.s.dias@aluno.com.br",
    matricula: "2025M042",
    biografia: "Focado em **tecnologia** e **desenvolvimento** de jogos.",
  },
  {
    nome: "Sofia Oliveira Costa",
    email: "sofia.o.costa@aluno.com.br",
    matricula: "2025F058",
    biografia:
      "Entusiasta de debates e **direitos** humanos. Foco em **sociologia**.",
  },
  {
    nome: "Alexsandro Souza Matos",
    email: "alexsandro.s.matos@aluno.com.br",
    matricula: "2025M043",
    biografia:
      "Focado em inovação e empreendedorismo. **Economia** e **tecnologia**.",
  },
  {
    nome: "Jefferson Neves Rocha",
    email: "jefferson.n.rocha@aluno.com.br",
    matricula: "2025M044",
    biografia:
      "Estudante de **psicologia**. A mente humana é o universo mais complexo. Foco em **saúde**.",
  },
  {
    nome: "Henrique Lemos Castro",
    email: "henrique.l.castro@aluno.com.br",
    matricula: "2025M045",
    biografia:
      "Aventureiro urbano, sempre explorando a cidade. Foco em **arquitetura** e **história** local.",
  },
  {
    nome: "Sidney Oliveira Lima",
    email: "sidney.o.lima@aluno.com.br",
    matricula: "2025M046",
    biografia:
      "Apaixonado por **cinema** e roteiros. Foco em **arte** e **comunicação**.",
  },
  {
    nome: "Kelly Cristina Reis",
    email: "kelly.c.reis@aluno.com.br",
    matricula: "2025F099",
    biografia:
      "Interessada em **direito** internacional e diplomacia. Estudo de **história** política.",
  },
];

//Função para gerar mensagens personalizadas com base na biografia do aluno

const gerarMensagem = (aluno) => {
  let saudacao = `Olá! Se você chegou até aqui, é porque a curiosidade venceu. `;
  let principal;

  // As palavras-chave agora estão garantidas nas biografias
  if (
    aluno.biografia.includes("engenharia") ||
    aluno.biografia.includes("tecnologia") ||
    aluno.biografia.includes("robótica")
  ) {
    principal = `Espero que você também se inspire a construir o futuro, um código/projeto de cada vez. A jornada vale a pena!`;
  } else if (
    aluno.biografia.includes("saúde") ||
    aluno.biografia.includes("médica") ||
    aluno.biografia.includes("nutrição") ||
    aluno.biografia.includes("veterinária")
  ) {
    principal = `Lembre-se de sempre colocar o bem-estar dos outros (ou dos animais!) em primeiro lugar. O mundo precisa da sua paixão.`;
  } else if (
    aluno.biografia.includes("arte") ||
    aluno.biografia.includes("design") ||
    aluno.biografia.includes("música") ||
    aluno.biografia.includes("cinema") ||
    aluno.biografia.includes("moda") ||
    aluno.biografia.includes("jornalismo") ||
    aluno.biografia.includes("comunicação")
  ) {
    principal = `Que você encontre a sua própria forma de expressão. Não pare de criar e de ver beleza onde ninguém mais vê.`;
  } else if (
    aluno.biografia.includes("história") ||
    aluno.biografia.includes("direito") ||
    aluno.biografia.includes("sociologia") ||
    aluno.biografia.includes("economia") ||
    aluno.biografia.includes("psicologia")
  ) {
    principal = `Pense grande, e use o conhecimento para transformar a sociedade. Conte a sua história.`;
  } else {
    principal = `Que a sua próxima aventura seja tão incrível quanto a que tivemos aqui. Sucesso e boas lembranças para nós!`;
  }

  const reflexoes = [
    "Aproveite cada segundo. O tempo aqui voa!",
    "Não deixe que o medo te impeça de tentar.",
    "Seja a mudança que você quer ver no mundo.",
    "Acredite mais em você do que nos seus críticos.",
    "O conhecimento é a única coisa que ninguém pode tirar de você.",
  ];

  // Seleciona a reflexão com base no último dígito da matrícula
  const matriculaNum = parseInt(aluno.matricula.slice(-3));
  const reflexao = reflexoes[matriculaNum % reflexoes.length];

  return `${saudacao}${principal} ${reflexao}`;
};

// FUNÇÃO PRINCIPAL DO SEEDING

async function main() {
  console.log("Iniciando o Seeding de 101 Alunos e seus relacionamentos...");

  // 1. Limpeza em Ordem (Filhas -> Pai) para evitar erros de FK
  try {
    await prisma.mensagem.deleteMany();
    await prisma.foto.deleteMany();
    await prisma.aluno.deleteMany();
    console.log("Registros existentes de Mensagem, Foto e Aluno deletados.");
  } catch (e) {
    console.warn(
      "ATENÇÃO: Não foi possível deletar todos os registros. Verifique as dependências."
    );
  }

  // 2. SEED DE ALUNOS
  const resultAlunos = await prisma.aluno.createMany({
    data: dadosAlunos,
    skipDuplicates: true,
  });
  console.log(
    `-> SEED ALUNOS concluído: ${resultAlunos.count} alunos criados!`
  );

  // 3. BUSCAR IDs DOS ALUNOS RECÉM-CRIADOS
  const alunosCriados = await prisma.aluno.findMany({
    select: { id: true, nome: true, matricula: true, biografia: true },
  });

  // 4. PREPARAR DADOS DE FOTOS (101 Registros com URL placeholder)
  const dadosFotos = alunosCriados.map((aluno) => ({
    url: `URL_DA_FOTO_A_SER_ADICIONADA_ALUNO_${aluno.matricula}`,
    descricao: `Foto oficial de ${aluno.nome} para o anuário.`,
    alunoId: aluno.id, // CHAVE ESTRANGEIRA
  }));

  // 5. PREPARAR DADOS DE MENSAGENS (101 Registros - Mensagem para o leitor do perfil)
  const dadosMensagens = alunosCriados.map((aluno) => ({
    texto: gerarMensagem(aluno),
    alunoId: aluno.id, // CHAVE ESTRANGEIRA: O Aluno que está "deixando" a mensagem
  }));

  // 6. SEED DE FOTOS (101 Fotos)
  const resultFotos = await prisma.foto.createMany({
    data: dadosFotos,
    skipDuplicates: true,
  });
  console.log(
    `-> SEED FOTOS concluído: ${resultFotos.count} fotos criadas com placeholder!`
  );

  // 7. SEED DE MENSAGENS (101 Mensagens)
  const resultMensagens = await prisma.mensagem.createMany({
    data: dadosMensagens,
    skipDuplicates: true,
  });
  console.log(
    `-> SEED MENSAGENS concluído: ${resultMensagens.count} mensagens criadas, cada uma do aluno para o leitor!`
  );

  console.log(
    "Seeding CONCLUÍDO! O banco está populado com 101 alunos, fotos (placeholder) e mensagens."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Prisma desconectado e processo encerrado.");
  });
