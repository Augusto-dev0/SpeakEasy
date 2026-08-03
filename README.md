# 🎤 SpeakEasy

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)
![Deploy](https://img.shields.io/badge/deploy-live-2bb283)

**SpeakEasy** é uma plataforma web gratuita que ajuda iniciantes brasileiros a praticarem
**inglês falado** de verdade, desde o primeiro dia, sem depender de tutor ao vivo. O foco não é
gramática, é colocar a pessoa para ouvir, falar, errar e evoluir, com feedback imediato direto no
navegador, através de lições interativas, reconhecimento de voz e exercícios visuais de fixação
de vocabulário.

🔗 **Acesse o site publicado:** [speak-easy-virid.vercel.app](https://speak-easy-virid.vercel.app)

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Web Speech API

Desenvolvido por **Luiz Augusto**
[Instagram](https://www.instagram.com/luiz.augusto7x/) ·
[GitHub](https://github.com/Augusto-dev0)

---

## 1. Rodando localmente

### Pré-requisitos
- Node.js 18.17 ou superior ([nodejs.org](https://nodejs.org))
- npm (vem junto com o Node)

### Passo a passo

```bash
# 1. Entre na pasta do projeto
cd speakeasy

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```

Abra **http://localhost:3000** no navegador. Use **Google Chrome** (desktop ou Android) para
garantir suporte completo ao reconhecimento de voz (`SpeechRecognition`), o navegador com
melhor suporte à Web Speech API hoje.

> ⚠️ O reconhecimento de voz (gravar sua fala) requer permissão de microfone e, em produção,
> **HTTPS** (a Vercel já fornece isso automaticamente). Em `localhost` funciona sem HTTPS.

### Build de produção local

```bash
npm run build
npm run start
```

---

## 2. Estrutura do projeto

```
speakeasy/
├── app/
│   ├── layout.tsx          # Layout raiz (fontes, providers, header/footer)
│   ├── globals.css         # Estilos globais + variáveis de tema
│   ├── icon.svg             # Favicon (moderno, transparente)
│   ├── favicon.ico          # Favicon (fallback legado)
│   ├── apple-icon.png       # Ícone para tela inicial iOS
│   ├── page.tsx             # Home (/)
│   ├── lessons/
│   │   ├── page.tsx         # Lista de lições (/lessons)
│   │   └── [id]/page.tsx    # Detalhe de uma lição (/lessons/greetings)
│   ├── practice/page.tsx    # Praticar Fala (/practice)
│   ├── flashcards/page.tsx  # Flashcards (/flashcards)
│   └── profile/page.tsx     # Perfil (/profile)
├── components/
│   ├── Header.tsx             # Menu fixo + navegação
│   ├── Footer.tsx
│   ├── OnboardingModal.tsx    # Boas-vindas na primeira visita
│   ├── ThemeProvider.tsx      # Contexto de dark/light mode
│   ├── ThemeToggle.tsx        # Switch de bolinha
│   ├── LanguageProvider.tsx   # Contexto de idioma da interface (PT/EN)
│   ├── LanguageToggle.tsx
│   ├── LessonCard.tsx
│   ├── LessonIcon.tsx         # Ícone lucide por lição
│   ├── VocabularyCard.tsx     # Card de vocabulário com imagem intuitiva
│   ├── VocabularyIcon.tsx     # Mapa de ícones por palavra
│   ├── FillBlankExercise.tsx  # Exercício de completar frases
│   ├── AudioPhraseRow.tsx     # Frase + botão de áudio (SpeechSynthesis)
│   ├── FlashcardItem.tsx      # Cartão com flip 3D
│   └── MotivationalMessage.tsx
├── lib/
│   ├── types.ts              # Tipos TypeScript compartilhados
│   ├── lessons.ts             # Conteúdo das lições (vocabulário, frases, completar frases)
│   ├── flashcards-data.ts     # Conteúdo dos flashcards
│   ├── storage.ts             # Progresso do usuário (localStorage)
│   └── speech.ts              # Wrapper da Web Speech API
├── tailwind.config.ts
└── package.json
```

---

## 3. Funcionalidades implementadas

- ✅ Dark mode / Light mode completo, com switch de bolinha, persistido em `localStorage` e
  respeitando a preferência do sistema operacional na primeira visita.
- ✅ Interface bilíngue (Português como padrão, alternável para Inglês) via `LanguageProvider`.
- ✅ **Praticar Fala**: ouvir modelo (`speechSynthesis`), gravar a própria voz
  (`SpeechRecognition`), comparação simples da transcrição com a frase-alvo e pontuação de 0 a 100%.
- ✅ **Modo Role-Playing**: diálogo simulado (cliente/garçom) alternando falas da "IA" e do
  usuário.
- ✅ **Imagens Intuitivas**: cada palavra do vocabulário tem um ícone associado ao significado,
  reforçando a associação direta imagem-palavra em vez da tradução literal.
- ✅ **Completar Frases**: exercício interativo em cada lição, com feedback imediato e opção de
  ouvir a frase completa, sem depender do microfone.
- ✅ **Flashcards** com efeito de flip 3D, filtro por categoria e áudio.
- ✅ **Progresso**: streak (sequência de dias), XP, lições concluídas e sessões de prática, tudo
  salvo em `localStorage`, sem necessidade de backend.
- ✅ Totalmente responsivo (mobile-first) e com foco visível para acessibilidade de teclado.

### Sobre a "correção de pronúncia"
O feedback de pronúncia é uma **heurística de comparação de texto** (transcrição do
`SpeechRecognition` vs. frase-alvo), não uma análise fonética real. É suficiente para motivar
o iniciante e apontar palavras a revisar, mas não substitui um avaliador de pronúncia dedicado.
Se o objetivo evoluir para precisão fonética, o próximo passo seria integrar uma API paga de
pronunciation assessment (ex: Azure Speech, Speechace).

---

## 4. Deploy gratuito na Vercel

### Opção A: via GitHub (recomendada)

1. Crie um repositório no GitHub e suba o projeto:
   ```bash
   git init
   git add .
   git commit -m "SpeakEasy - primeira versão"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/speakeasy.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub.
3. Clique em **Add New → Project**, selecione o repositório `speakeasy`.
4. A Vercel detecta Next.js automaticamente. Não é necessário configurar nada, apenas clique em
   **Deploy**.
5. Em poucos minutos você recebe uma URL pública (ex: `speakeasy.vercel.app`), já com HTTPS
   (necessário para o microfone funcionar).

### Opção B: via Vercel CLI (sem GitHub)

```bash
npm install -g vercel
cd speakeasy
vercel login
vercel        # gera um preview
vercel --prod # publica em produção
```

Siga as perguntas no terminal (aceite os padrões). A CLI imprime a URL final ao terminar.

### Variáveis de ambiente
Este projeto **não precisa** de nenhuma variável de ambiente ou banco de dados, todo o
progresso do usuário fica no `localStorage` do navegador dele.

---

## 5. Próximos passos sugeridos (roadmap)

| Prioridade | Melhoria | Impacto |
|---|---|---|
| Alta | Adicionar mais lições/temas (trabalho, saúde, tecnologia) | Retenção de usuários avançados |
| Alta | Sistema de conta + sincronização em nuvem (ex: Supabase) | Progresso não se perde ao trocar de dispositivo |
| Média | Avaliação de pronúncia fonética real (Azure/Speechace) | Feedback mais preciso, maior confiança do usuário |
| Média | Notificações push para manter a streak | Aumento de engajamento diário |
| Baixa | Gamificação (rankings, conquistas) | Aumento de retenção via competição social |

---

Feito com foco em ajudar quem está começando a falar inglês, um dia de cada vez. 🌱
