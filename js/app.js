// --- CONFIGURATION ---
// Get a free Web3Forms Access Key at: https://web3forms.com
// Paste the access key below to start receiving email submissions instantly!
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. Navigation & Scroll Effects
     ========================================== */
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    highlightNavOnScroll();
  });

  // Active Link Highlight (Scrollspy)
  function highlightNavOnScroll() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Account for header height
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }


  /* ==========================================
     2. Scroll Reveal Animation
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================
     3. About Us Tabs
     ========================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });


  /* ==========================================
     4. Services Modal System
     ========================================== */
  const modalOverlay = document.getElementById('serviceModal');
  const modalCloseBtn = modalOverlay.querySelector('.modal-close-btn');
  const serviceDetailBtns = document.querySelectorAll('.service-learn-more');
  const modalContactBtn = modalOverlay.querySelector('.modal-inquire-btn');
  const serviceSelector = document.getElementById('serviceRequired');

  // Service detailed technical data
  const servicesData = {
    'organic-waste': {
      title: 'Organic Waste Management',
      tag: 'Integrated Solutions',
      desc: 'In collaboration with certified agricultural and composting partners, we integrate and manage comprehensive organic waste systems to process food waste and agricultural residues close to the source.',
      features: [
        'Decentralized setups integrated with composting networks',
        'Minimal odor and leachate management systems',
        'Coordinated composting and bio-bin configurations',
        'Ensures complete compliance with local environmental norms',
        'Operational support and waste auditing'
      ],
      specs: {
        'Execution Model': 'Collaborative design with certified organic recycling partners',
        'Output Standard': 'FCO compliant (Organic Compost standards)',
        'Service Footprint': 'Scalable layouts starting from 500 sq.ft.',
        'Primary Application': 'Tech parks, commercial complexes, housing societies'
      }
    },
    'owc-machines': {
      title: 'Organic Waste Converters (OWC)',
      tag: 'Combined Venture Solution',
      desc: 'High-speed, automatic, and semi-automatic OWC systems supplied through our strategic technology partnership. Engineered for industrial-grade organic waste shredding, mixing, and biological degradation.',
      features: [
        'Delivered in strategic technology partnership',
        'Heavy-duty stainless steel internal components',
        'PLC automated controls for safe, easy operation',
        'Fast processing: 10-15 minutes cycle time',
        'Integrated deodorization and air-vent setups',
        'Full OEM warranty and replacement parts support'
      ],
      specs: {
        'System Supply': 'Strategic combined venture partners',
        'Volume Reduction': 'Diverts volume by 80% within 24 hours',
        'Curing Setup': 'Air-ventilated high-density curing crates',
        'OEM Support': 'Full engineering operations & maintenance support'
      }
    },
    'plastic-waste': {
      title: 'Plastic Waste Management',
      tag: 'Partner Integration',
      desc: 'Facilitating complete post-consumer plastic tracking and circular recycling in partnership with state-authorized recycling networks. We coordinate collections, sorting, and reporting to fulfill Extended Producer Responsibility (EPR) targets.',
      features: [
        'EPR compliance coordination & audit trails',
        'Segregation and material sorting frameworks',
        'Processing via state-licensed plastic recycling units',
        'Direct traceability logs for regulatory submissions',
        'Supply coordination of recycled plastic resins'
      ],
      specs: {
        'Processing Network': 'Licensed state pollution control board recyclers',
        'Traceability Standard': '100% auditable waste transfer logs',
        'Material Capabilities': 'PET, HDPE, LDPE, PP, PS, and flexible polymers',
        'EPR Compliance': 'Mapped directly to national/state EPR guidelines'
      }
    },
    'sewage-treatment': {
      title: 'Sewage Treatment Solutions',
      tag: 'Collaborative Engineering',
      desc: 'Turnkey wastewater and sewage treatment solutions integrated by Econex and supplied through specialized OEM manufacturing partners. We customize, commission, and operate high-standard MBBR, SBR, and MBR plants.',
      features: [
        'Turnkey design integration matching site spatial limits',
        'Treated water systems engineered for reuse and recycling',
        'Equipment sourced from certified machinery OEMs',
        'Odor-managed operation with compliance venting',
        'Integrated PLC automation and remote monitoring options'
      ],
      specs: {
        'Integration Model': 'Econex engineering custom setups with OEM manufacturing partners',
        'Technology Used': 'Moving Bed Bio-Reactor (MBBR) / Sequential Batch Reactor (SBR)',
        'Treated Water Quality': 'BOD < 5 mg/L, TSS < 5 mg/L, COD < 30 mg/L (Board Compliant)',
        'Operations Support': 'Optional comprehensive Operations & Maintenance (O&M) contracts'
      }
    },
    'biomining-services': {
      title: 'Biomining Services',
      tag: 'Consortium Execution',
      desc: 'Legacy waste remediation and dumpsite clearing executed in alliance with specialized heavy-machinery and engineering consortium associates. We handle bio-stabilization, screening, and secondary fuel recovery.',
      features: [
        'Bio-stabilization of legacy dumpsites via joint-venture assets',
        'Rotary trommel segregation for multi-fraction sorting',
        'Segregation and supply of Refuse Derived Fuel (RDF) to cement kilns',
        'Separation of compostable soil fraction and inert materials',
        'Land reclamation mapping and project clearance logging'
      ],
      specs: {
        'Operational Alliance': 'Joint execution with heavy-equipment & fleet associates',
        'Sorting Resolution': 'Multi-deck trommels sorting up to 4 fractions',
        'Environmental Safety': 'Active deodorization & gas monitoring during excavation',
        'Capacity Range': 'Designed to scale for municipal dumpsites of any volume'
      }
    },
    'recycling-solutions': {
      title: 'Recycling & Env Solutions',
      tag: 'Compliance & Consultation',
      desc: 'Bespoke corporate waste audit solutions, zero-waste compliance frameworks, and environmental advisory to streamline waste management tracking and ESG metrics reporting.',
      features: [
        'Waste characterization and segregation audits',
        'Modular material recovery facility (MRF) layout designs',
        'Regulatory pollution board compliance advisory and gap analysis',
        'Onsite employee training and sustainability workshops',
        'Audit documentation for ESG tracking parameter metrics'
      ],
      specs: {
        'Consulting Framework': 'Aligned with state rules and standard industrial parameters',
        'Infrastructure Planning': 'Custom layouts for modular bins, compactors, and balers',
        'Audit Turnaround': 'Comprehensive assessment reports within 4 to 6 weeks',
        'Reporting Standard': 'Formatted for compliance submissions and corporate sustainability reports'
      }
    }
  };

  // Open Modal
  serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      const data = servicesData[serviceKey];
      
      if (!data) return;

      // Populate Modal Content
      modalOverlay.querySelector('.modal-title-box h3').textContent = data.title;
      modalOverlay.querySelector('.modal-title-box span').textContent = data.tag;
      modalOverlay.querySelector('.modal-desc').textContent = data.desc;
      
      // Populate Features
      const featuresList = modalOverlay.querySelector('.modal-features-list');
      featuresList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.className = 'modal-feature-item';
        li.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${feat}</span>
        `;
        featuresList.appendChild(li);
      });

      // Populate Tech Specs Table
      const specsTable = modalOverlay.querySelector('.modal-specs-table');
      specsTable.innerHTML = '';
      for (const [key, val] of Object.entries(data.specs)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${key}</td>
          <td>${val}</td>
        `;
        specsTable.appendChild(tr);
      }

      // Store the service key on the inquiry button for reference
      modalContactBtn.setAttribute('data-service-key', serviceKey);
      
      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable background scroll
    });
  });

  // Close Modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable background scroll
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Modal contact navigation auto-routing
  modalContactBtn.addEventListener('click', () => {
    const serviceKey = modalContactBtn.getAttribute('data-service-key');
    closeModal();
    
    // Map service keys to the contact dropdown options
    const dropdownMapping = {
      'organic-waste': 'organic',
      'owc-machines': 'owc',
      'plastic-waste': 'plastic',
      'sewage-treatment': 'sewage',
      'biomining-services': 'biomining',
      'recycling-solutions': 'recycling'
    };

    if (serviceSelector && dropdownMapping[serviceKey]) {
      serviceSelector.value = dropdownMapping[serviceKey];
    }

    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  });


  /* ==========================================
     5. OWC Machine Integration (Customized Setups)
     ========================================== */
  // OWC setups are now custom-engineered per client; specific models and selectors have been removed.





  /* ==========================================
     7. Testimonials Carousel / Slider
     ========================================== */
  const testimonialTrack = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const nextBtn = document.getElementById('nextTestimonial');
  const prevBtn = document.getElementById('prevTestimonial');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (testimonialTrack && slides.length > 0) {
    let currentIdx = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // Create Carousel Indicator Dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
      // Shift track according to index
      testimonialTrack.style.transform = `translateX(-${currentIdx * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIdx);
      });
    }

    function nextSlide() {
      currentIdx = (currentIdx + 1) % slideCount;
      updateCarousel();
    }

    function prevSlide() {
      currentIdx = (currentIdx - 1 + slideCount) % slideCount;
      updateCarousel();
    }

    function goToSlide(index) {
      currentIdx = index;
      updateCarousel();
      resetAutoPlay();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    // Autoplay implementation
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Start autoplay and pause on hover
    startAutoPlay();
    testimonialTrack.parentElement.addEventListener('mouseenter', stopAutoPlay);
    testimonialTrack.parentElement.addEventListener('mouseleave', startAutoPlay);
  }


  /* ==========================================
     8. Process Steps Interactivity
     ========================================== */
  const processSteps = document.querySelectorAll('.process-step');
  
  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });


  /* ==========================================
     9. Lead-Gen Form Handling & Validation
     ========================================== */
  const contactForm = document.getElementById('leadGenerationForm');
  const toastContainer = document.getElementById('toastContainer');

  // Input elements
  const inputs = {
    name: document.getElementById('clientName'),
    company: document.getElementById('companyName'),
    phone: document.getElementById('phoneNumber'),
    email: document.getElementById('clientEmail'),
    service: document.getElementById('serviceRequired'),
    message: document.getElementById('clientMessage')
  };

  // Validation Patterns
  const validationRules = {
    name: value => value.trim().length >= 2,
    company: value => value.trim().length >= 2,
    phone: value => /^[+]?[0-9\s-]{10,15}$/.test(value.trim()),
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    service: value => value !== '',
    message: value => value.trim().length >= 10
  };

  // Live input validation listeners
  Object.keys(inputs).forEach(key => {
    const inputEl = inputs[key];
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        validateField(key);
      });
      inputEl.addEventListener('blur', () => {
        validateField(key);
      });
    }
  });

  function validateField(fieldName) {
    const input = inputs[fieldName];
    const validator = validationRules[fieldName];
    if (!input || !validator) return true;

    const isValid = validator(input.value);
    
    if (isValid) {
      input.classList.remove('error');
    } else {
      input.classList.add('error');
    }
    return isValid;
  }

  function validateForm() {
    let isAllValid = true;
    Object.keys(inputs).forEach(key => {
      const isValid = validateField(key);
      if (!isValid) isAllValid = false;
    });
    return isAllValid;
  }

  // Success Toast Notification Engine
  function showToast(title, message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div class="toast-content">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Slide in toast
    setTimeout(() => {
      toast.classList.add('active');
    }, 100);

    // Slide out toast & delete
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4000);
  }

  // Handle Form Submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Run entire validation check
      const isValid = validateForm();
      if (!isValid) {
        showToast('Validation Error', 'Please check the highlighted fields and try again.');
        return;
      }

      // Show loader state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('span');
      const loader = submitBtn.querySelector('.loader');

      submitBtn.disabled = true;
      if (loader && btnText) {
        loader.style.display = 'block';
        btnText.textContent = 'Processing Request...';
      }

      // Assemble submission record
      const formData = {
        name: inputs.name.value.trim(),
        company: inputs.company.value.trim(),
        phone: inputs.phone.value.trim(),
        email: inputs.email.value.trim(),
        service: inputs.service.value,
        message: inputs.message.value.trim(),
        timestamp: new Date().toISOString()
      };

      if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
        // Send actual email submission via Web3Forms
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Lead - ${formData.company} (${formData.service})`,
            from_name: "Econex Web Portal",
            name: formData.name,
            company: formData.company,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            message: formData.message
          })
        })
        .then(async (response) => {
          const result = await response.json();
          if (response.status === 200) {
            showToast('Consultation Requested', 'Thank you! Your inquiry was sent successfully. We will contact you soon.');
            contactForm.reset();
            Object.values(inputs).forEach(input => {
              if (input) input.classList.remove('error');
            });
          } else {
            showToast('Submission Error', result.message || 'Something went wrong. Please try again.');
          }
        })
        .catch(error => {
          showToast('Network Error', 'Failed to connect. Please check your internet connection.');
        })
        .finally(() => {
          submitBtn.disabled = false;
          if (loader && btnText) {
            loader.style.display = 'none';
            btnText.textContent = 'Request Consultation';
          }
        });
      } else {
        // Simulate B2B API Lead ingestion post (Local fallback)
        setTimeout(() => {
          const existingLeads = JSON.parse(localStorage.getItem('econex_leads') || '[]');
          existingLeads.push(formData);
          localStorage.setItem('econex_leads', JSON.stringify(existingLeads));

          submitBtn.disabled = false;
          if (loader && btnText) {
            loader.style.display = 'none';
            btnText.textContent = 'Request Consultation';
          }
          
          contactForm.reset();
          Object.values(inputs).forEach(input => {
            if (input) input.classList.remove('error');
          });

          showToast('Consultation Requested', 'Local Simulation Success! Get a Web3Forms key to receive actual emails.');
        }, 1200);
      }
    });
  }

});
