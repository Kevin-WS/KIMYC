function iniciarSiteKIMYC() {
    // 1. Barra de Progresso de Leitura no Topo
    const progressBar = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
      if (!progressBar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : "0%";
    });
  
    // 2. Menu Mobile (Hambúrguer)
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("navegador");
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => nav.classList.remove("open"));
      });
    }
  
    // 3. Efeito de Digitação (Typewriter)
    const words = ["escalar vendas", "conquistar autoridade", "atrair clientes", "dominar o Google"];
    const typewriterEl = document.getElementById("typewriter");
    let wordIndex = 0, charIndex = 0, isDeleting = false;
  
    function typeEffect() {
      if (!typewriterEl) return;
      const currentWord = words[wordIndex];
      typewriterEl.textContent = isDeleting 
        ? currentWord.substring(0, charIndex - 1) 
        : currentWord.substring(0, charIndex + 1);
      charIndex += isDeleting ? -1 : 1;
      let speed = isDeleting ? 50 : 100;
  
      if (!isDeleting && charIndex === currentWord.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
      }
      setTimeout(typeEffect, speed);
    }
    typeEffect();
  
    // 4. Animação ao Rolar a Página (Scroll Reveal)
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  
    // 5. Controle da Janela Modal (Fale Conosco + Feedback)
    const modalOverlay = document.getElementById("modal-overlay");
    const modalClose = document.getElementById("modal-close");
    const triggersModal = document.querySelectorAll(".open-modal-trigger");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const modalForms = document.querySelectorAll(".modal-form");
  
    function abrirModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.add("active");
      modalOverlay.setAttribute("aria-hidden", "false");
    }
  
    function fecharModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove("active");
      modalOverlay.setAttribute("aria-hidden", "true");
    }
  
    triggersModal.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        abrirModal();
      });
    });
  
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        tabBtns.forEach(b => b.classList.toggle("active", b === btn));
        modalForms.forEach(f => f.classList.toggle("active", f.id === targetId));
      });
    });
  
    if (modalClose) modalClose.addEventListener("click", fecharModal);
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) fecharModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") fecharModal();
    });
  
    // 6. Questionário + Integração com o Formulário de Contato
    const checkboxes = document.querySelectorAll(".diag-check");
    const scoreValue = document.getElementById("score-value");
    const scoreTitle = document.getElementById("score-title");
    const scoreDesc = document.getElementById("score-desc");
    const btnMelhorarNota = document.getElementById("btn-melhorar-nota");
    const campoMensagemModal = document.getElementById("m-mensagem");
    const campoMensagemPagina = document.getElementById("mensagem");
  
    let pontuacaoAtual = 0;
    let statusAtual = "Invisível no Digital";
  
    function calcularNota() {
      let total = 0;
      checkboxes.forEach(item => {
        if (item.checked) total += Number(item.value) || 0;
      });
      pontuacaoAtual = total;
      if (scoreValue) scoreValue.textContent = `${total}%`;
  
      if (total === 0) {
        statusAtual = "Invisível no Digital";
        if (scoreDesc) scoreDesc.textContent = "Sua empresa está deixando muito dinheiro na mesa. A KIMYC pode construir sua base do zero.";
      } else if (total <= 50) {
        statusAtual = "Presença Básica";
        if (scoreDesc) scoreDesc.textContent = "Você já deu os primeiros passos, mas ainda perde clientes para concorrentes mais estruturados.";
      } else if (total < 100) {
        statusAtual = "Bom Caminho";
        if (scoreDesc) scoreDesc.textContent = "Faltam poucos ajustes estratégicos para transformar sua estrutura em uma máquina de vendas.";
      } else {
        statusAtual = "Pronto para Escalar!";
        if (scoreDesc) scoreDesc.textContent = "Excelente base! Podemos ajudar com otimização avançada de TI e conversão.";
      }
      if (scoreTitle) scoreTitle.textContent = statusAtual;
    }
  
    checkboxes.forEach(box => box.addEventListener("change", calcularNota));
  
    if (btnMelhorarNota) {
      btnMelhorarNota.addEventListener("click", (e) => {
        e.preventDefault();
        const faltando = [];
        checkboxes.forEach(box => {
          if (!box.checked) faltando.push(box.parentElement.innerText.trim());
        });
  
        let resumo = `Olá! Fiz o diagnóstico no site da KIMYC e minha nota foi ${pontuacaoAtual}% (${statusAtual}).\n`;
        if (faltando.length > 0) {
          resumo += `Gostaria de ajuda para implementar:\n• ${faltando.join("\n• ")}`;
        } else {
          resumo += `Já tenho a estrutura básica e quero escalar meus resultados com consultoria de TI.`;
        }
  
        if (campoMensagemModal) campoMensagemModal.value = resumo;
        if (campoMensagemPagina) campoMensagemPagina.value = resumo;
        abrirModal();
      });
    }
  
    // 7. Estrelas de Avaliação na Aba de Feedback
    const stars = document.querySelectorAll("#star-rating .star");
    const fbNotaInput = document.getElementById("fb-nota");
    stars.forEach(star => {
      star.addEventListener("click", () => {
        const val = Number(star.dataset.value);
        if (fbNotaInput) fbNotaInput.value = val;
        stars.forEach(s => s.classList.toggle("active", Number(s.dataset.value) <= val));
      });
    });
  
    // 8. Máscara de Telefone e Envios para WhatsApp
    ["telefone", "m-telefone"].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener("input", (e) => {
          let val = e.target.value.replace(/\D/g, "");
          val = val.replace(/^(\d{2})(\d)/g, "($1) $2");
          val = val.replace(/(\d)(\d{4})$/, "$1-$2");
          e.target.value = val;
        });
      }
    });
  
    // TROQUE PELO SEU NÚMERO REAL COM 55 + DDD (Ex: 5551999999999)
    const numeroWhatsApp = "5551999999999"; 
  
    function configurarEnvioContato(formId, nomeId, emailId, telId, msgId, feedbackId, fecharDepois) {
      const form = document.getElementById(formId);
      const feedback = document.getElementById(feedbackId);
      if (!form) return;
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById(nomeId).value.trim();
        const email = document.getElementById(emailId).value.trim();
        const tel = document.getElementById(telId).value.trim();
        const msg = document.getElementById(msgId).value.trim();
  
        const textoWhats = `*Nova Solicitação - KIMYC*\n\n*Nome:* ${nome}\n*E-mail:* ${email}\n*WhatsApp:* ${tel}\n*Diagnóstico:* ${pontuacaoAtual}% (${statusAtual})\n\n*Mensagem:*\n${msg}`;
        window.open(`https://wa.me{numeroWhatsApp}?text=${encodeURIComponent(textoWhats)}`, "_blank", "noopener,noreferrer");
  
        if (feedback) {
          feedback.style.color = "#4CE619";
          feedback.textContent = `✅ Obrigado, ${nome}! Abrindo WhatsApp...`;
        }
        form.reset();
        if (fecharDepois) setTimeout(fecharModal, 1400);
      });
    }
  
    configurarEnvioContato("form-contato", "nome", "email", "telefone", "mensagem", "form-feedback", false);
    configurarEnvioContato("modal-tab-contato", "m-nome", "m-email", "m-telefone", "m-mensagem", "m-feedback-contato", true);
  
    // Envio da Aba de Feedback
    const formFeedback = document.getElementById("modal-tab-feedback");
    const feedbackAvaliacao = document.getElementById("m-feedback-avaliacao");
    if (formFeedback) {
      formFeedback.addEventListener("submit", (e) => {
        e.preventDefault();
        const nomeFb = document.getElementById("fb-nome").value.trim() || "Visitante";
        const notaFb = fbNotaInput ? fbNotaInput.value : "5";
        const tipoFb = document.getElementById("fb-tipo").value;
        const comentarioFb = document.getElementById("fb-comentario").value.trim();
  
        const textoWhatsFb = `*Novo Feedback - KIMYC* ⭐\n\n*Nome:* ${nomeFb}\n*Nota:* ${notaFb}/5 estrelas\n*Assunto:* ${tipoFb}\n*Comentário:* ${comentarioFb}`;
        window.open(`https://wa.me{numeroWhatsApp}?text=${encodeURIComponent(textoWhatsFb)}`, "_blank", "noopener,noreferrer");
  
        if (feedbackAvaliacao) {
          feedbackAvaliacao.style.color = "#4CE619";
          feedbackAvaliacao.textContent = `✅ Muito obrigado pelo feedback, ${nomeFb}!`;
        }
        formFeedback.reset();
        setTimeout(fecharModal, 1400);
      });
    }
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarSiteKIMYC);
  } else {
    iniciarSiteKIMYC();
  }
  