import type { ContactFormData } from '@/types/global';

// Configuración de Formspree
const FORMSPREE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '',
};

export async function sendEmailWithFormspree(data: ContactFormData): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Validar configuración
    if (!FORMSPREE_CONFIG.endpoint) {
      throw new Error('Formspree endpoint no está configurado. Asegúrate de configurar NEXT_PUBLIC_FORMSPREE_ENDPOINT en tus variables de entorno.');
    }

    // Preparar datos para Formspree
    const formData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      // Campos adicionales para mejor organización en Formspree
      _replyto: data.email,
      _subject: `[Portafolio] ${data.subject}`,
      // Campo honeypot para prevenir spam (opcional)
      _gotcha: '',
    };

    console.log('Enviando datos a Formspree:', {
      endpoint: FORMSPREE_CONFIG.endpoint,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
    });

    // Enviar a Formspree
    const response = await fetch(FORMSPREE_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      // Manejar diferentes tipos de errores de Formspree
      if (response.status === 422) {
        const errors = result.errors || [];
        const errorMessages = errors.map((error: any) => {
          if (error.field === 'email') return 'Email no válido';
          if (error.field === '_replyto') return 'Email de respuesta no válido';
          return error.message || 'Error de validación';
        });
        throw new Error(errorMessages.join(', ') || 'Error de validación en los datos');
      }
      
      if (response.status === 429) {
        throw new Error('Demasiadas solicitudes. Por favor, espera un momento antes de intentar nuevamente.');
      }
      
      if (response.status >= 500) {
        throw new Error('Error del servidor de Formspree. Por favor, intenta más tarde.');
      }
      
      throw new Error(result.message || `Error HTTP ${response.status}: ${response.statusText}`);
    }

    console.log('Email enviado exitosamente via Formspree:', result);

    return {
      success: true,
      message: 'Message sent successfully! I will contact you soon.',
    };

  } catch (error) {
    console.error('Error al enviar email via Formspree:', error);
    
    let errorMessage = 'Error al enviar mensaje. Por favor, intenta nuevamente.';
    
    if (error instanceof Error) {
      // Personalizar mensajes de error comunes
      if (error.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.';
      } else if (error.message.includes('endpoint no está configurado')) {
        errorMessage = 'Servicio de email no configurado. Por favor, contacta al administrador.';
      } else if (error.message.includes('Email no válido')) {
        errorMessage = 'Por favor, verifica que tu email sea válido.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
}

// Función para validar la configuración de Formspree
export function validateFormspreeConfig(): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT) {
    errors.push('NEXT_PUBLIC_FORMSPREE_ENDPOINT no está configurado');
  }

  if (process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT && 
      !process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT.includes('formspree.io')) {
    errors.push('El endpoint de Formspree no parece válido');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Función utilitaria para obtener el estado de configuración
export function getFormspreeStatus(): {
  configured: boolean;
  endpoint: string | null;
  errors: string[];
} {
  const validation = validateFormspreeConfig();
  
  return {
    configured: validation.isValid,
    endpoint: FORMSPREE_CONFIG.endpoint || null,
    errors: validation.errors,
  };
}