FROM node:18-bullseye-slim

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get upgrade -y && \
    apt-get -y install --no-install-recommends apt-utils 2>&1

# Install dependencies
RUN apt-get -y install git jq unzip locales zsh nano vim fonts-powerline python3 python3-pip zsh-syntax-highlighting curl && \
  locale-gen en_US.UTF-8

RUN echo "deb http://httpredir.debian.org/debian bullseye main contrib" > /etc/apt/sources.list \
    && echo "deb http://security.debian.org/debian-security/ bullseye-security main contrib" >> /etc/apt/sources.list \
    && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
    && apt-get update \
    && apt-get install -y ttf-mscorefonts-installer

ENV DIRENV_VERSION=2.20.0

RUN curl -sL https://github.com/direnv/direnv/releases/download/v${DIRENV_VERSION}/direnv.linux-amd64 \
  -o /usr/local/bin/direnv && chmod +x /usr/local/bin/direnv

RUN curl -fLSs https://circle.ci/cli | bash

ENV TERM xterm-256color
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV SPACESHIP_PROMPT_VERSION=3.11.2

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true && \
  git clone --branch v${SPACESHIP_PROMPT_VERSION} https://github.com/denysdovhan/spaceship-prompt.git /root/.oh-my-zsh/custom/themes/spaceship-prompt && \
  ln -s /root/.oh-my-zsh/custom/themes/spaceship-prompt/spaceship.zsh-theme /root/.oh-my-zsh/custom/themes/spaceship.zsh-theme && \
  sed -ie "s|ZSH_THEME=.*|ZSH_THEME=spaceship|" /root/.zshrc && \
  echo 'source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> /root/.zshrc && \
  echo 'eval "$(direnv hook zsh)"' >> /root/.zshrc && \
  mkdir -p /root/.config/direnv/ && \
  printf '[whitelist]\nprefix = ["/workspaces", "/host"]' >> /root/.config/direnv/config.toml

RUN pip3 install pre-commit

# Clean up
RUN apt-get autoremove -y && \
  apt-get clean -y && \
  rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog

# Set the default shell to zsh rather than sh
ENV SHELL /bin/zsh