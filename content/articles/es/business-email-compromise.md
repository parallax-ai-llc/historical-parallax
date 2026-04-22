---
id: "business-email-compromise"
name: "Compromiso de correo electrónico empresarial"
birth: "Unknown"
death: "Unknown"
nationality: "International"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Business_Email_Compromise"
lastUpdated: "2026-02-26"
---

## Resumen

Esquema de fraude global en el que delincuentes se hacen pasar por ejecutivos de empresas para engañar a empleados y lograr que transfieran dinero. El FBI estima que el BEC causó pérdidas por $51 mil millones entre 2013 y 2022.

## Cronología

| Año | Evento |
|------|-------|
| 2013 | El FBI comenzó a rastrear el BEC |
| 2019 | Se reportaron $26 mil millones en pérdidas |
| 2022 | $51 mil millones en pérdidas acumuladas |

## Referencias

[^1]: Wikipedia, "Business Email Compromise" - https://en.wikipedia.org/wiki/Business_Email_Compromise

## Cómo se ve el BEC (nivel general)

El Business Email Compromise (BEC) generalmente se basa menos en malware y más en **ingeniería social**. Los atacantes buscan colocar una solicitud frente a la persona adecuada en el momento adecuado, utilizando un lenguaje creíble, presión de tiempo y un contexto empresarial plausible.

Los objetivos comunes incluyen personal de finanzas, cuentas por pagar, asistentes ejecutivos, equipos de adquisiciones y cualquier persona que pueda iniciar o aprobar pagos.

## Patrones comunes

Los incidentes de BEC suelen seguir patrones reconocibles:

- **Suplantación de ejecutivos:** Un mensaje parece provenir de un CEO/CFO solicitando una transferencia urgente.
- **Fraude de facturas de proveedores:** Los datos bancarios de un proveedor son "actualizados" y los pagos futuros se dirigen al atacante.
- **Toma de control de cuentas:** El atacante obtiene acceso a un buzón de correo real y utiliza hilos de conversación existentes para insertar instrucciones fraudulentas.
- **Pretexto de abogado/consultor:** El atacante afirma que el asunto es confidencial y urgente.

## Por qué funciona

El BEC tiene éxito porque explota el comportamiento organizacional normal:

- **Confianza en el correo interno** y en nombres familiares
- **Flujos de pago rutinarios** donde las pequeñas excepciones son comunes
- **Presión de tiempo** (fin de trimestre, viajes, "estoy en una reunión")
- **Aprobaciones fragmentadas** donde cada persona asume que alguien más verificó la solicitud

## Controles defensivos (prácticos)

Las defensas de alto nivel son principalmente procedimentales y centradas en la identidad:

- **Verificación fuera de banda:** Confirmar cambios bancarios o transferencias urgentes mediante un número de teléfono conocido y confiable o un canal secundario.
- **Autenticación robusta:** Implementar MFA y acceso condicional para correo electrónico y herramientas de colaboración.
- **Controles de pago:** Doble aprobación para nuevos beneficiarios, cambios de datos bancarios y transferencias grandes/urgentes.
- **Protecciones de dominio:** SPF/DKIM/DMARC para reducir la suplantación de identidad (no es una solución completa, pero es útil).
- **Capacitación de concientización:** Enseñar al personal cómo identificar "señales de alerta" (urgencia, secretismo, redacción inusual, nuevos datos bancarios).

## Detección y respuesta

Cuando se sospecha de BEC, las prioridades de respuesta generalmente incluyen:

1. **Detener la transacción** (contactar al banco de inmediato; la velocidad es crucial).
2. **Preservar la evidencia** (encabezados de correo, cuerpos de mensajes, historial de inicio de sesión, reglas de buzón/reenvíos).
3. **Contener** (restablecer credenciales, revocar sesiones, verificar abuso de aplicaciones OAuth).
4. **Determinar el alcance** (revisar conversaciones adicionales, facturas y cualquier otra instrucción de pago alterada).

## Notas sobre la medición

Las estimaciones de pérdidas pueden variar según la fuente y la metodología. Los totales públicos a menudo combinan pérdidas confirmadas con intentos reportados y pueden ser sensibles al subreporte, diferencias regionales en la presentación de informes y definiciones cambiantes a lo largo del tiempo.

## Referencias adicionales

(Consulte la sección de referencias anterior.)