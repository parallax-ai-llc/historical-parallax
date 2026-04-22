---
id: "deep-fake-fraud"
name: "Fraude con deepfake"
birth: "2020-01-01"
death: "Unknown"
nationality: "International"
occupation: ["Emerging Crime"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Deep_Fake_Fraud"
lastUpdated: "2026-02-26"
---

## Resumen

Los videos y voces deepfake generados por IA se utilizan para cometer fraudes, incluyendo el robo de 25 millones de dólares a una empresa de Hong Kong, donde los delincuentes falsificaron una videollamada con el director financiero de la compañía.

## Cronología

| Año | Evento |
|------|-------|
| 2024 | 25 millones de dólares robados mediante una videollamada deepfake |

## Modus Operandi (Cómo Funciona)

El fraude mediante deepfake generalmente combina ingeniería social con medios sintéticos:

- **Reconocimiento:** los atacantes recopilan muestras de voz/video de charlas públicas, reuniones o redes sociales.
- **Modelado:** se entrena o ajusta un modelo de clonación de voz o síntesis facial con las muestras recopiladas.
- **Evento de suplantación:** el objetivo recibe una llamada o videollamada que parece provenir de un ejecutivo, proveedor o contraparte de confianza.
- **Pretexto urgente:** el suplantador presiona al objetivo para eludir los controles normales ("acuerdo confidencial", "pago urgente", "no involucres a otros").
- **Captura de pago o credenciales:** los fondos se transfieren a cuentas controladas por los atacantes, o se obtienen credenciales/aprobaciones de MFA.

## Patrones de Ataque Comunes

- **Suplantación de ejecutivos (BEC + deepfake):** voz o video del director financiero/director ejecutivo utilizado para autorizar transferencias.
- **Desvío de pagos a proveedores:** voz sintética utilizada para "confirmar" nuevos datos bancarios.
- **Estafas de reclutamiento/recursos humanos:** entrevistas deepfake para obtener acceso a sistemas internos o nóminas.
- **Intentos de elusión de KYC/identidad:** rostros sintéticos utilizados para burlar verificaciones de vida o procesos de incorporación remota.

## Indicadores y Señales de Alerta

Incluso cuando los medios parecen convincentes, las señales operativas suelen delatarse:

- Solicitudes de **omitir devoluciones de llamada** o **evitar confirmaciones escritas**.
- **Cambio repentino de cuentas de destino** o enrutamiento de pagos inusual.
- **Artefactos de audio** (cadencia extraña, respiraciones ausentes, consonantes cortadas) o **artefactos visuales** (desincronización labial, movimiento ocular antinatural).
- Un participante que insiste en **cámara apagada**, baja resolución o frecuentes "problemas técnicos".
- La solicitud no coincide con el contexto conocido, las prioridades o los flujos de aprobación establecidos.

## Mitigaciones (Alto Nivel)

- **Verificación fuera de banda:** devolución de llamada obligatoria a un número conocido (del directorio, no del mensaje) para solicitudes sensibles.
- **Integridad de dos personas:** requerir múltiples aprobaciones independientes para transferencias de alto valor.
- **Controles de pago:** aplicar listas de beneficiarios permitidos, períodos de espera para nuevos destinatarios y verificación de cambios en datos bancarios.
- **Higiene en reuniones:** verificar participantes mediante plataformas autenticadas; evitar aceptar la identidad únicamente por audio/video.
- **Capacitación en concientización:** enfocarse en el cumplimiento de procesos bajo presión, no solo en "detectar artefactos".

## Impacto

- **Pérdida financiera:** robo directo y costos de recuperación.
- **Interrupción operativa:** respuesta a incidentes, congelamiento de transacciones y auditoría/análisis forense.
- **Daño reputacional:** erosión de la confianza en las comunicaciones y la colaboración remota.
- **Externalidades de seguridad:** los deepfakes pueden utilizarse para aumentar la efectividad del phishing y el compromiso de correo electrónico empresarial (BEC).

## Conceptos Relacionados

- **Compromiso de Correo Electrónico Empresarial (BEC)**
- **Ingeniería social**
- **Clonación de voz / síntesis de habla**
- **Fraude de identidad sintética**

## Referencias

[^1]: Wikipedia, "Deep Fake Fraud" - https://en.wikipedia.org/wiki/Deep_Fake_Fraud