import {
  Droplets,
  GraduationCap,
  Settings,
  Sprout,
  Sun,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export interface DivisionRecord {
  slug: string;
  title: string;
  shortLabel: string;
  icon: LucideIcon;
  summary: string;
  overview: string;
  heroImage: string;
  detailImage: string;
  mediaCaption: string;
  mediaDetail?: string;
  focusAreas: string[];
  deliveryPoints: string[];
  relatedProducts: string[];
}

export const divisions: DivisionRecord[] = [
  {
    slug: 'water-infrastructure',
    title: 'Water Infrastructure',
    shortLabel: 'Water Infrastructure',
    icon: Droplets,
    summary: 'Planning, execution support, and instrumentation alignment for treatment, storage, transmission, and distribution assets.',
    overview:
      'Smaatech supports water infrastructure teams with practical engineering coordination across civil works, process utility equipment, reservoir systems, piping networks, and field-level handover. The focus is on dependable execution: understanding site conditions, coordinating vendors and field teams, and keeping the final system maintainable for operators.',
    heroImage: '/images/water.png',
    detailImage: '/images/water-treatment-site.jpeg',
    mediaCaption: 'This water treatment site shows practical civil execution around clarifier tanks, treatment buildings, overhead storage, and utility circulation areas.',
    mediaDetail:
      'The focus remains practical: civil readiness, equipment access, operating visibility, and clear handover planning for teams responsible for daily treatment plant operation.',
    focusAreas: [
      'Water treatment plant support, process utilities, and site coordination',
      'Reservoir, intake, ESR, storage, and distribution-linked execution',
      'Instrumentation planning for flow, level, quality, and operating visibility',
      'Documentation support for commissioning, handover, and operator readiness',
    ],
    deliveryPoints: [
      'Site-first planning that reflects actual ground conditions and utility constraints',
      'Coordination between civil, mechanical, electrical, and instrumentation scopes',
      'Structured checks before handover so the operating team receives a readable system',
      'Practical support for measurement, monitoring, and future maintenance needs',
    ],
    relatedProducts: ['Water Meter', 'Electromagnetic Flow Meter', 'Level Sensor & Switch'],
  },
  {
    slug: 'electro-mechanical',
    title: 'Electro-Mechanical',
    shortLabel: 'Electro-Mechanical',
    icon: Settings,
    summary: 'Electrical and mechanical integration support for utility systems, panels, control rooms, and industrial facilities.',
    overview:
      'The electro-mechanical service brings together equipment integration, utility connections, panel coordination, mechanical readiness, and field support. It is useful when a project needs a practical bridge between design intent and actual operating conditions on site.',
    heroImage: '/images/automation.png',
    detailImage: '/images/electro-mechanical-panel-room.jpeg',
    mediaCaption: 'This panel-room installation shows practical electro-mechanical execution around MCC, feeder, and control-panel readiness for site utilities.',
    mediaDetail:
      'The focus remains practical: safe panel access, clear feeder identification, protection readiness, and commissioning checks before the system is handed over to operators.',
    focusAreas: [
      'Equipment installation, alignment, and field integration support',
      'Power, control panel, and control-room coordination',
      'Mechanical utility connections, valves, supports, and commissioning assistance',
      'Readiness checks for safe and maintainable plant operation',
    ],
    deliveryPoints: [
      'Execution planning around shutdown windows, safety access, and operating constraints',
      'Cross-team coordination between electrical, mechanical, vendor, and site teams',
      'Clear punch-list tracking before commissioning and project closure',
      'Handover support that helps operators understand the installed system',
    ],
    relatedProducts: ['Power & Control Panel', 'Control Valve', 'Level Sensor & Switch'],
  },
  {
    slug: 'automation-scada',
    title: 'Automation & SCADA',
    shortLabel: 'Automation & SCADA',
    icon: Zap,
    summary: 'Monitoring, control, field instrumentation, and SCADA support for reliable plant and utility visibility.',
    overview:
      'Smaatech helps teams connect field instruments, panels, PLC/HMI systems, and reporting workflows so operators can see what is happening in real time. The service is built around practical control logic, readable alarms, reliable signal mapping, and maintainable operating screens.',
    heroImage: '/images/automation-scada-hmi-screen.jpeg',
    detailImage: '/images/automation-scada-hmi-screen.jpeg',
    mediaCaption:
      'This SCADA/HMI screen brings process equipment, alarms, temperature and pressure values, fan status, filter systems, and control points into one operator view.',
    mediaDetail:
      'The focus remains practical: clean tag naming, readable alarm status, trend visibility, control permissions, and operator screens that maintenance teams can understand during daily plant operation.',
    focusAreas: [
      'PLC, HMI, SCADA, and supervisory monitoring support',
      'Instrumentation and field-device integration',
      'Alarm, trend, and operating visibility for plant teams',
      'Signal testing, loop checks, and practical control workflow setup',
    ],
    deliveryPoints: [
      'Control logic support based on the way the site actually operates',
      'Readable naming, signal mapping, and documentation for maintenance teams',
      'Testing support across field devices, panels, and supervisory screens',
      'Operator-focused dashboards that avoid unnecessary complexity',
    ],
    relatedProducts: ['pH Analyzer', 'Chlorine Analyzer', 'Electromagnetic Flow Meter'],
  },
  {
    slug: 'agritech-iot',
    title: 'Agritech IoT',
    shortLabel: 'Agritech IoT',
    icon: Sprout,
    summary: 'Condition monitoring, remote alerts, and field-linked sensing for agriculture, storage, and operational teams.',
    overview:
      'Agritech IoT work focuses on practical monitoring for storage, handling, and agriculture-linked operations. The goal is to help teams track conditions, receive timely alerts, and make better operating decisions without making the system difficult to run in the field.',
    heroImage: '/images/agritech.png',
    detailImage: '/images/agritech-greenhouse-robotics.jpg',
    mediaCaption:
      'Greenhouse automation uses sensors, robotic handling, and crop-zone monitoring to support consistent growing conditions and careful harvesting workflows.',
    mediaDetail:
      'The focus remains practical: crop-bed visibility, irrigation and climate signals, equipment status, operator alerts, and field-ready controls that help teams manage protected cultivation with less manual guesswork.',
    focusAreas: [
      'Remote temperature, humidity, level, and condition monitoring',
      'Storage environment awareness for agriculture-linked facilities',
      'Alerting workflows for supervisors and field teams',
      'Pilot-to-scale support for practical IoT deployments',
    ],
    deliveryPoints: [
      'Hardware selection based on environment, power availability, and maintenance access',
      'Simple monitoring screens and notifications for day-to-day use',
      'Field testing before scale-up so the system stays dependable',
      'Support for integrating sensors with operating and reporting workflows',
    ],
    relatedProducts: ['Level Sensor & Switch', 'Water Meter', 'pH Analyzer'],
  },
  {
    slug: 'solar-epc',
    title: 'Solar EPC',
    shortLabel: 'Solar EPC',
    icon: Sun,
    summary: 'Solar project planning, electrical integration, installation coordination, and deployment-readiness support.',
    overview:
      'Smaatech approaches solar EPC work with an execution-first mindset. The service supports project planning, site readiness, electrical integration, vendor coordination, and verification so solar installations can be delivered with realistic timelines and clear operating expectations.',
    heroImage: '/images/solar.png',
    detailImage: '/images/hero_solar_refrigeration.png',
    mediaCaption: 'Solar EPC work needs clean site planning, electrical coordination, and verification before the system is handed over for operation.',
    focusAreas: [
      'Site assessment support and execution planning for solar installations',
      'Electrical integration, protection, and panel coordination',
      'Vendor, installation, and commissioning-stage support',
      'Readiness checks for handover, operation, and maintenance planning',
    ],
    deliveryPoints: [
      'Alignment between actual site conditions and project scope',
      'Installation sequencing that considers access, safety, and electrical constraints',
      'Verification support before energization and project handover',
      'Clear communication between owners, vendors, and operating teams',
    ],
    relatedProducts: ['Power & Control Panel', 'Control Valve'],
  },
  {
    slug: 'skilled-training',
    title: 'Skilled Training',
    shortLabel: 'Skilled Training',
    icon: GraduationCap,
    summary: 'Practical training support for operators, technicians, field teams, and early-career engineering professionals.',
    overview:
      'The skilled training service helps teams build practical readiness around plant operation, field execution, instrumentation basics, safety awareness, and project handover. It is designed for real working environments where people need to understand equipment, workflows, and responsibilities clearly.',
    heroImage: '/images/training.png',
    detailImage: '/images/skilled-training-chalkboard.jpg',
    mediaCaption:
      'Skilled training builds a clear path from learning and knowledge to hands-on experience, support, development, and practical work goals.',
    mediaDetail:
      'The focus remains practical: structured sessions, simple explanations, equipment awareness, safety discipline, troubleshooting habits, and confidence for operators, technicians, and early-career engineering teams.',
    focusAreas: [
      'Operator and technician orientation for plant and field roles',
      'Applied engineering exposure for trainees and early-career professionals',
      'Instrumentation, panel, and utility-system familiarization',
      'Handover and operating-readiness support for project teams',
    ],
    deliveryPoints: [
      'Training modules aligned with actual site and equipment contexts',
      'Simple operating explanations for day-to-day plant and field tasks',
      'Guidance that bridges technical documents and practical execution',
      'Support for teams adopting new automation, monitoring, or utility systems',
    ],
    relatedProducts: ['Power & Control Panel', 'Water Meter'],
  },
];

export const divisionMap = new Map(divisions.map((division) => [division.slug, division]));
