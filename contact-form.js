const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwvcAwHg6P6Oz9DnUQYbWguzSn5sQYHcV4uFXP3SMUZ5SCJgmRyKszcK01sZ_WqUAD/exec';

const contactForms = document.querySelectorAll('[data-contact-form]');

contactForms.forEach((form) => {
  const submitBtn = form.querySelector('[data-submit]');
  const responseMsg = form.querySelector('[data-response]');
  const descInput = form.querySelector('textarea[name="description"]');
  const charCount = form.querySelector('[data-char-count]');
  const defaultSubmitText = submitBtn?.textContent?.trim() || 'Send';

  if (descInput && charCount) {
    const updateCharCount = () => {
      charCount.textContent = descInput.value.length.toString();
    };

    descInput.addEventListener('input', updateCharCount);
    updateCharCount();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = submitBtn.dataset.loadingText || 'Sending...';
    }

    if (responseMsg) {
      responseMsg.classList.add('is-hidden');
      responseMsg.textContent = '';
      responseMsg.classList.remove('form-message--success', 'form-message--error');
    }

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (data.description) {
        data.description = data.description.toString().slice(0, 300);
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (responseMsg) {
        responseMsg.classList.remove('is-hidden');

        if (result.status === 'success') {
          responseMsg.classList.add('form-message--success');
          responseMsg.textContent = result.message || 'Request sent successfully.';
          form.reset();
          if (charCount) {
            charCount.textContent = '0';
          }
        } else {
          responseMsg.classList.add('form-message--error');
          responseMsg.textContent = result.message || 'Error processing data. Please try again.';
        }
      }
    } catch (error) {
      if (responseMsg) {
        responseMsg.classList.remove('is-hidden');
        responseMsg.classList.add('form-message--error');
        responseMsg.textContent = `Submission Failed: ${error.message}`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultSubmitText;
      }
    }
  });
});
