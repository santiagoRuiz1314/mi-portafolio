import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

// Función para enviar email con Formspree directamente en este archivo
async function sendEmailWithFormspree(data: ContactFormData): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    
    if (!endpoint) {
      throw new Error('Formspree endpoint no está configurado. Asegúrate de configurar NEXT_PUBLIC_FORMSPREE_ENDPOINT en tus variables de entorno.');
    }

    // Preparar datos para Formspree
    const formData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      _replyto: data.email,
      _subject: `[Portafolio] ${data.subject}`,
    };

    console.log('Enviando datos a Formspree:', {
      endpoint,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
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
      message: '¡Mensaje enviado exitosamente! Te contactaré pronto.',
    };

  } catch (error) {
    console.error('Error al enviar email via Formspree:', error);
    
    let errorMessage = 'Error al enviar mensaje. Por favor, intenta nuevamente.';
    
    if (error instanceof Error) {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método no permitido'
    });
  }

  try {
    const { name, email, subject, message }: ContactFormData = req.body;

    // Validaciones básicas
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email no válido'
      });
    }

    // Validaciones de longitud
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'El nombre debe tener entre 2 y 100 caracteres'
      });
    }

    if (subject.length < 5 || subject.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'El asunto debe tener entre 5 y 200 caracteres'
      });
    }

    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'El mensaje debe tener entre 10 y 1000 caracteres'
      });
    }

    // Enviar email usando Formspree
    const result = await sendEmailWithFormspree({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }

  } catch (error) {
    console.error('Error en API de contacto:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Por favor, intenta nuevamente.'
    });
  }
}

// Configuración para limitar el tamaño del body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};