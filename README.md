<h1 align="center">
    <a href="https://desafio-softfocus-frontend.vercel.app/">Desafio Técnico Softfocus</a>
</h1>

<h3 align="center">O desafio proposto consiste em um projeto Fullstack responsável pelo cadastro de comunicações de perda em caso de desastres naturais ocorridos em lavouras. Não deve ser possível que os cadastros sejam divergentes, ou seja, as causas da perda não podem ser divergentes em cadastros na mesma data em um raio de 10km. Os cadastros ficam salvos em um banco de dados relacional (PostgreSQL) e são apresentados ao usuário por meio de uma interface em React.</h3>

<br/>

### ✅ Features da aplicação - Backend

- [x] Cadastrar novos casos de ocorrência com validações e mensagens de erro condizentes;
- [x] Ler todos os registros de forma paginada, dando a informação ao usuário de quantas páginas existem, quantos registros existem e também sobre a anterior e próxima página;
- [x] Atualizar os dados da ocorrência, validando para o caso de divergências;
- [x] Ler apenas um registro pelo ID;
- [x] Atualizar e deletar registro pelo ID;
- [x] Filtrar por parâmetros de URL (os filtros funcionam tanto juntos quanto separados, mais informações na seção Documentação);

<br/>

### ✅ Features da aplicação - Frontend

- [x] Cadastrar uma nova ocorrência com validação nos campos do formulário;
- [x] Visualização clara em caso de conflito na criação, dando opção do usuário tentar novamente ou verificar o registro conflitado;
- [x] Visualização das ocorrências cadastradas, com páginação;
- [x] Filtragem de ocorrências pelo CPF do solicitante;
- [x] Mostrar todos os registros novamente com o clique de um botão;
- [x] Mensagem amigável no caso de não existir registros;
- [x] Possibilidade de alterar os dados de uma ocorrência e/ou deletá-la;
- [x] Proteção do formulário no caso de conflito (deve-se checkar o checkbox no final do formulário para poder alterar os campos em caso de conflito de informações);
- [x] Mensagem clara para o usuário sobre o porquê sua requisição não deu certo em caso de conflito, mostrando inclusive a distância entre as ocorrências.
- [x] Interface amigável para navegação livre entre o formulário de cadastro e a listagem de ocorrências.

<br/>

### ✅ Documentação

- [x] A API está documentada e disponível apra consulta nos endpoints <a href="https://desafio-softfocus-backend.herokuapp.com/docs/swagger-ui/">/docs/swagger-ui/<a/> <span>e</span> <a href="https://desafio-softfocus-backend.herokuapp.com/docs/redoc/">/docs/redoc/</a>;
- [x] As datas podem ser passadas tanto no formato "dd/mm/aaaa" quando no formato ISO "aaaa-mm-dd";
- [x] O CPF obrigatoriamente deve possuir 11 caracteres;
- [x] Para causa da perda, os valores aceitáveis são apenas:
      "CHUVA EXCESSIVA",
      "GEADA",
      "GRANIZO",
      "SECA",
      "VENDAVAL",
      "RAIO";
- [x] Não é possível cadastrar ocorrências com causas diferentes, na mesma data, em um raio de 10km.
- [x] Exemplo de endpoint de filtro com paginação: `/api/perdas/?pagina=1&cpf=12345678910&data_colheita=20/08/2022`
- [x] Os filtros funcionam de forma combinada, ou seja, no endpoint de exemplo acima, iria retornar todos os registros que possuem o CPF do solicitante igual a 123.456.789-10 e que estão registrados na data 20/08/2022.
- [x] Parâmetros disponíveis para pesquisa pela URL (formato /?primeiro_parametro&segundo=valor&terceiro=valor)

<br/>

### ✅ Link para a demo da aplicação

- [x] Backend -> <a href="https://desafio-softfocus-backend.herokuapp.com">Desafio Softfocus - Backend</a>
- [x] Frontend -> <a href="https://desafio-softfocus-frontend.vercel.app/">Desafio Suflex - Frontend</a>

<br/>

#### 🏠 Homepage da aplicação

![image](https://user-images.githubusercontent.com/91695244/187296710-ba35ce51-f325-4243-9456-d5699786201b.png)

<br/>

#### ✅ Informações cadastradas

![image](https://user-images.githubusercontent.com/91695244/187297179-bb81d1a2-61e4-43c8-8725-00158b8e8a84.png)

<br/>

#### ✅ Modal de informações da ocorrência

![image](https://user-images.githubusercontent.com/91695244/187297295-3e176a9a-3d3c-4990-8518-18ec45cb146d.png)

<br/>

#### ✅ Modal em caso de conflito

![image](https://user-images.githubusercontent.com/91695244/187298128-9777816d-4960-4026-9c14-13b19491e7c8.png)

<br/>

#### ✅ Tela de conflito

![image](https://user-images.githubusercontent.com/91695244/187298379-f6c13778-0e79-4f68-8777-997a1a830f19.png)

<br/>

#### ✅ Área suportada em latitude e longitude

- [x] A área suportada para latitude e longitude está dentro dos extremos do país, ainda é possível inserir locais de países vizinhos, mas é impossível, por exemplo, inserir um local na Ásia ou Europa.

![image](https://user-images.githubusercontent.com/91695244/187309943-cd1dbb4f-ae8f-47c9-bc9c-3f5686b936ad.png)

<br/>

### ✅ Como rodar a aplicação localmente

Antes de tudo, você precisa das seguintes tecnologias:

- [x] [Git](https://git-scm.com)
- [x] [Node](https://nodejs.org/en/)
- [x] [Docker](https://www.docker.com/)
- [x] [NPM](https://www.npmjs.com/)
- [x] [Python](https://www.python.org/)
- [x] Algum editor de códigos, no meu caso, utilizo o [VSCode](https://code.visualstudio.com/)

<br/>

### 🎲 Preparando o ambiente

```bash
# Faça o clone deste repositório

$ git clone git@github.com:arturcomoli/desafio-tecnico-softfocus.git


# Entre na raiz do repositório clonado

$ cd desafio-tecnico-softfocus


# Por existir um deploy live, será necessário entrar na branch exclusiva para testar a aplicação localmente

$ git checkout docker


# Gere o container no docker

$ sudo docker compose up --build

# Pronto! A aplicação está rodando nas portas:
# Backend -> 8000
# Banco de dados -> 5432
# Frontend -> 3000, o Vite pode vir a variar as portas. Cheque no terminal caso não esteja rodando na porta 3000.

# Caso não tenha o docker instalado em sua máquina, siga as instruções abaixo:

# Renomeie o arquivo .env.example para .env (no diretório "api"), ou crie um arquivo novo (.env) e popule-o com as informações do seu usuário


$ psql 'seu_usuario_postgres'

ou apenas

$ psql

seu_usuario=> CREATE DATABASE nome_do_db_no_.env

$ cd api/

$ python -m venv venv --upgrade-deps

# Para sistemas operacionais Linux e MacOS

$ source venv/bin/activate

# Para Windows

$ venv/Script/activate

# Instalando as dependências

$ pip install -r requirements.txt

$ python manage.py migrate

$ python manage.py runserver

# Pronto! Agora o backend da aplicação está rodando na porta 8000, basta você acessar http://localhost:8000.


# Em outro terminal, na raíz do projeto:

$ cd client/

$ npm install

$ npm run dev

# Após isso, o Vite irá te informar em qual porta estará sendo rodada sua aplicação. Basta segurar a tecla CTRL e clicar no link do localhost!!

# Prontinho, agora o ambiente está totalmente configurado!
```

### 🎲 Executando os testes

Após clonar o repositório e entrar em sua raíz (conforme descrito acima), siga os passos abaixo:

```bash
# BACKEND

$ cd api/

$ TEST=TEST python manage.py test -v2

```

### 🛠 Principais tecnologias utilizadas - Backend

- [Django Rest Framework](https://www.django-rest-framework.org/) - Lógica do backend
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [DRF Spectacular](https://drf-spectacular.readthedocs.io/en/latest/) - Geração da documentação da API
- [Heroku](https://heroku.com/) - Deploy da API
- [IPDB](https://pypi.org/project/ipdb/) Debug e auxílio no desenvolvimento
- Outras bibliotecas que auxiliaram no desenvolvimento podem ser encontradas no arquivo `requirements.txt`

<br/>

### 🛠 Principais tecnologias utilizadas - Frontend

- [Vite](https://vitejs.dev/) - Criação do React App
- [Chakra UI](https://chakra-ui.com/) - Aplicação de estilos na aplicação
- [Axios](https://axios-http.com/ptbr/docs/intro) - Gerenciamento de requisições HTTP
- [React Hot Toast](https://react-hot-toast.com/) - Feedback de erros ao usuário
- [React Router Dom](https://reactrouter.com/) - Roteamento das páginas da aplicação
- Outras bibliotecas que auxiliaram no desenvolvimento podem ser encontradas na seção: `"dependencies"` e `"devDependencies"` no arquivo `package.json`, no diretório relacionado ao frontend

<br/>

##### NOTA ENDPOINTS BACKEND: Na raíz desse projeto existe um arquivo `insomnia.json`, lá se encontram todos os endpoints da aplicação. Note que existem dois ambientes, o dev e o production.

<br/>

### ✅ Desenvolvedor responsável - Artur Comoli

<img src="https://avatars.githubusercontent.com/u/91695244?v=4" alt="Artur Comoli" style="border-radius: 50%" width="120px"/>

<br/>

Entre em contato!

<div>
    <a href = "mailto:artur.comoli@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"/>
    <a href="https://www.linkedin.com/in/artur-comoli" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>     
</div>
