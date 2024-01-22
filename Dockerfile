# Use a imagem oficial do Node.js na versão 16
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependências para o diretório de trabalho
COPY package*.json ./

# Limpa o cache antes de iniciar o install
RUN npm cache clean --force

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação estará em execução
EXPOSE 3000