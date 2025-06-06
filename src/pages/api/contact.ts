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

    // Validación básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email no válido'
      });
    }

    // Validar longitudes
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

    // Aquí normalmente enviarías el email
    // Por ahora solo logueamos la información
    console.log('Nuevo mensaje de contacto:', {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    // Simular un pequeño delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res.status(200).json({
      success: true,
      message: '¡Mensaje enviado exitosamente! Te contactaré pronto.'
    });

  } catch (error) {
    console.error('Error en API de contacto:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Por favor, intenta nuevamente.'
    });
  }
}

// Configuración para el manejo de CORS si es necesario
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};