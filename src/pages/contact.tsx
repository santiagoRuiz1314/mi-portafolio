import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ContactForm } from '@/components/ContactForm';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/utils/constants';
import { cn } from '@/utils/cn';
import type { ContactFormData } from '@/types/global';

const ContactPage: React.FC = () => {
  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      return {
        success: response.ok,
        message: result.message || (response.ok ? 'Mensaje enviado exitosamente' : 'Error al enviar mensaje')
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
      description: 'Respondo emails en 24 horas'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: SITE_CONFIG.phone,
      href: `tel:${SITE_CONFIG.phone}`,
      description: 'Disponible de 9 AM a 6 PM COT'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: SITE_CONFIG.location,
      href: 'https://maps.google.com/?q=Bucaramanga,Colombia',
      description: 'Colombia (GMT-5)'
    },
    {
      icon: Clock,
      label: 'Horario',
      value: 'Lun - Vie, 9 AM - 6 PM',
      href: null,
      description: 'Zona horaria: COT (GMT-5)'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: SOCIAL_LINKS.github,
      icon: '🔗',
      description: 'Revisa mi código'
    },
    {
      name: 'LinkedIn',
      url: SOCIAL_LINKS.linkedin,
      icon: '💼',
      description: 'Conectemos profesionalmente'
    },
    {
      name: 'Twitter',
      url: SOCIAL_LINKS.twitter,
      icon: '🐦',
      description: 'Sígueme para updates'
    }
  ];

  const reasons = [
    {
      icon: '🚀',
      title: 'Proyectos nuevos',
      description: 'Desarrollo de aplicaciones web modernas y escalables'
    },
    {
      icon: '🛠️',
      title: 'Consultoría técnica',
      description: 'Asesoramiento en arquitectura y tecnologías web'
    },
    {
      icon: '👥',
      title: 'Colaboraciones',
      description: 'Trabajo en equipo en proyectos interesantes'
    },
    {
      icon: '📚',
      title: 'Mentoría',
      description: 'Guío a desarrolladores junior en su crecimiento'
    }
  ];

  return (
    <Layout
      seo={{
        title: 'Contacto',
        description: `Ponte en contacto conmigo para proyectos, colaboraciones o consultas. Ubicado en ${SITE_CONFIG.location}.`,
        keywords: ['contacto', 'desarrollador', 'freelance', 'proyectos', 'colaboración'],
      }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let’s Talk About Your Project!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I’m always interested in new challenges and collaboration opportunities. 
              Got a great idea? I’d love to hear about it!
            </p>
            
            {/* Status Badge */}
            {SITE_CONFIG.availableForWork && (
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full text-sm font-medium mb-8">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for new projects</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
              How can I help you?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 text-center hover:shadow-medium transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{reason.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Envíame un mensaje
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Completa el formulario y te responderé lo antes posible. 
                    También puedes contactarme directamente usando la información de la derecha.
                  </p>
                </div>

                <ContactForm
                  onSubmit={handleFormSubmit}
                  variant="default"
                  showSubject={true}
                  placeholder={{
                    name: 'Tu nombre completo',
                    email: 'tu@email.com',
                    subject: '¿En qué proyecto trabajamos juntos?',
                    message: 'Cuéntame sobre tu proyecto, presupuesto estimado y timeline...'
                  }}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Información de contacto
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Prefiere una comunicación más directa? Aquí tienes varias formas de contactarme.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-soft transition-shadow"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                          <info.icon size={20} className="text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {info.label}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-gray-900 dark:text-white">{info.value}</span>
                        )}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    También me encuentras en
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <span className="text-xl">{social.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {social.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {social.description}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border border-primary-200 dark:border-primary-800">
                  <div className="flex items-center space-x-3 mb-3">
                    <MessageCircle className="text-primary-600 dark:text-primary-400" size={24} />
                    <h3 className="font-semibold text-primary-900 dark:text-primary-100">
                      Respuesta rápida garantizada
                    </h3>
                  </div>
                  <p className="text-primary-800 dark:text-primary-200 text-sm">
                    Me comprometo a responder todos los mensajes en un máximo de 24 horas. 
                    Para consultas urgentes, puedes contactarme directamente por WhatsApp o teléfono.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Preguntas frecuentes
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: '¿Cuánto cuesta desarrollar mi proyecto?',
                  answer: 'El costo depende de varios factores como complejidad, tiempo de desarrollo, y características específicas. Después de nuestra primera conversación, te proporcionaré una cotización detallada y transparente.'
                },
                {
                  question: '¿Cuánto tiempo toma completar un proyecto?',
                  answer: 'Los timeframes varían según el alcance: sitios web simples (2-4 semanas), aplicaciones web complejas (6-12 semanas), aplicaciones móviles (8-16 semanas). Siempre incluyo tiempo para pruebas y refinamientos.'
                },
                {
                  question: '¿Trabajas con presupuestos pequeños?',
                  answer: 'Sí, trabajo con startups y pequeñas empresas. Ofrezco opciones flexibles como desarrollo por fases, MVP (producto mínimo viable), y planes de pago adaptados a tu presupuesto.'
                },
                {
                  question: '¿Qué incluye el servicio de desarrollo?',
                  answer: 'Incluyo diseño responsive, optimización SEO, testing, deployment, documentación, y soporte post-lanzamiento. También proporciono capacitación para que puedas gestionar el contenido básico.'
                }
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <summary className="font-medium text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;