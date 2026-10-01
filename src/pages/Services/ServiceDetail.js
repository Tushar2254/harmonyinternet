import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';import PageWrapper from '../../components/PageWrapper/PageWrapper';
import './ServiceDetail.css';

export const serviceData = {
  'internet-leased-line': {
    slug: 'internet-leased-line',
    icon: 'fas fa-network-wired',
    color: '#0891b2',
    badge: 'Enterprise Connectivity',
    title: 'Internet Leased Line',
    subtitle: 'Dedicated Internet for Businesses That Demand Performance',
    image: '/Services/High speed technology fiber optic _ Premium Vector.jpg',
    gallery: [
      {
        src: '/Services/ILL.jpg',
        caption: "Powering India's Growing Fiber Infrastructure",
      },
      {
        src: '/Services/The Future of Leased Lines in Business.jpg',
        caption: 'The Future of Leased Lines in Business',
      },
    ],
    intro: "In today's digital-first world, every business relies on fast, secure, and uninterrupted internet connectivity. Harmony Internet Private Limited provides Dedicated Internet Leased Line (ILL) solutions designed to meet the connectivity needs of enterprises, corporate offices, IT companies, educational institutions, healthcare organizations, manufacturing industries, and growing businesses.",
    highlight: 'Unlike traditional broadband, an Internet Leased Line offers a dedicated 1:1 bandwidth connection exclusively for your organization, ensuring guaranteed speeds, low latency, and reliable uptime without fluctuations caused by network congestion.',
    whyTitle: 'Why Choose an Internet Leased Line?',
    whyDesc: 'Unlike shared broadband connections, an Internet Leased Line provides dedicated bandwidth exclusively for your business. Your internet speed remains consistent regardless of peak-hour traffic, making it ideal for mission-critical operations — cloud applications, large file transfers, server hosting, and multi-site connectivity.',
    features: [
      'Dedicated 1:1 symmetric bandwidth — guaranteed upload & download speeds',
      'High-speed fiber from Mbps to multi-Gbps capacity',
      '99.9%+ uptime backed by Service Level Agreement (SLA)',
      'Unlimited data — no throttling or fair usage limits',
      'Low latency for VoIP, ERP, cloud & video conferencing',
      'Static IP address for servers, VPNs & remote access',
      'Enterprise-grade security and reliable network infrastructure',
      'Scalable bandwidth that grows with your business',
      '24×7 NOC monitoring and dedicated technical support',
      'Quick installation, proactive maintenance & rapid fault resolution',
    ],
    closing: 'From consultation and network planning to installation and ongoing support, our team works closely with every client to ensure the right connectivity solution. Whether you\'re a startup, an SME, or a large enterprise, Harmony Internet delivers secure, high-performance ILL services that keep your business connected and future-ready.',
    stats: [
      { value: '99.9%', label: 'SLA Uptime' },
      { value: '1:1',   label: 'Dedicated Ratio' },
      { value: '24×7',  label: 'NOC Support' },
      { value: 'Multi-Gbps', label: 'Max Capacity' },
    ],
  },
  'enterprise-broadband': {
    slug: 'enterprise-broadband',
    icon: 'fas fa-building',
    color: '#059669',
    badge: 'Business Internet',
    title: 'Enterprise Broadband',
    subtitle: 'Reliable Business Broadband for Growing Enterprises',
    image: '/Services/Enterprise broadband/Save this & follow for more! 📌.jpg',
    gallery: [
      { src: '/Services/Enterprise broadband/How Hiring the Best Talent Contributes to Better Business Finances.jpg', caption: '' },
      { src: '/Services/Enterprise broadband/Routers.jpg', caption: '' },
      { src: '/Services/Enterprise broadband/Data Science Meeting.jpg', caption: '' },
    ],
    intro: 'A dependable internet connection is essential for businesses that rely on cloud applications, online collaboration, video conferencing, and digital communication. Harmony Internet\'s Enterprise Broadband service is designed for startups, SMEs, corporate offices, retail businesses, educational institutions, and commercial establishments.',
    highlight: 'Unlike standard residential broadband, our Enterprise Broadband is optimized for business usage — offering enhanced stability, lower latency, and dedicated customer support to minimize downtime and maximize productivity.',
    whyTitle: 'Built for Business Performance',
    whyDesc: 'Built on a robust fiber network, our business broadband solutions deliver consistent performance enabling your teams to work efficiently without interruptions — managing operations, accessing cloud platforms, or serving customers online.',
    features: [
      'High-speed fiber broadband with reliable performance',
      'Unlimited data plans for uninterrupted business operations',
      'Stable connectivity for cloud, video conferencing & remote work',
      'Business-grade network with low latency',
      'Flexible plans tailored to your business requirements',
      'Secure internet connectivity for offices and commercial spaces',
      'Professional installation and quick deployment',
      'Dedicated customer support for faster issue resolution',
    ],
    closing: 'Our Enterprise Broadband solutions deliver the perfect balance of performance, reliability, and affordability. With proactive technical support and scalable plans, we help businesses stay connected, productive, and ready for future growth.',
    stats: [
      { value: '1 Gbps', label: 'Max Speed' },
      { value: 'Unlimited', label: 'Data' },
      { value: '24×7', label: 'Support' },
      { value: 'Fiber', label: 'Infrastructure' },
    ],
  },
  'managed-services': {
    slug: 'managed-services',
    icon: 'fas fa-cogs',
    color: '#7c3aed',
    badge: 'IT Management',
    title: 'Managed Services',
    subtitle: 'Proactive IT Management That Keeps Your Business Running',
    image: '/Services/Managed services/Gemini_Generated_Image_wlmmdnwlmmdnwlmm.png',
    intro: 'Managing IT infrastructure requires time, expertise, and continuous monitoring. Harmony Internet\'s Managed Services allow businesses to focus on their core operations while we take care of their network, systems, and IT infrastructure.',
    highlight: 'Our experienced technical team provides proactive monitoring, preventive maintenance, network management, and technical support to ensure maximum uptime and optimal performance — identifying and resolving issues before they impact operations.',
    whyTitle: 'Your Extended IT Team',
    whyDesc: 'Whether you have an in-house IT team or need complete infrastructure management, our managed services can be tailored to your business requirements. We become an extension of your IT team with proactive support, continuous monitoring, and industry best practices.',
    features: [
      '24×7 infrastructure and network monitoring',
      'Preventive maintenance and health checks',
      'Faster issue detection and resolution',
      'Enhanced network security and reliability',
      'Reduced operational downtime',
      'Experienced technical support team',
      'Cost-effective IT management',
      'Scalable solutions as your business grows',
    ],
    closing: 'Harmony Internet helps businesses improve operational efficiency while reducing the complexity of managing IT infrastructure — from monitoring and maintenance to security and support.',
    stats: [
      { value: '24×7', label: 'Monitoring' },
      { value: 'Proactive', label: 'Maintenance' },
      { value: 'Zero', label: 'Downtime Goal' },
      { value: 'Scalable', label: 'Solutions' },
    ],
  },
  'ftth': {
    slug: 'ftth',
    icon: 'fas fa-home',
    color: '#00d4ff',
    badge: 'Home Internet',
    title: 'Fiber to the Home (FTTH)',
    subtitle: 'High-Speed Fiber Internet for Homes & Businesses',
    image: '/Services/ftth/ChatGPT Image Sep 1, 2026, 02_27_05 AM.png',
    gallery: [
      { src: '/Services/ftth/Essential Smart Home Devices Checklist For Your Living Room.jpg', caption: '' },
      { src: '/Services/ftth/Fastest Internet in Madhapur for Seamless Connectivity.jpg', caption: '' },
      { src: '/Services/ftth/🍿 Labor Day Weekend Movie Night Ideas for the Perfect Cozy Home Theater.jpg', caption: '' },
    ],
    intro: 'Harmony Internet\'s Fiber to the Home (FTTH) service delivers ultra-fast internet directly through advanced fiber-optic technology. Designed for modern homes, apartments, residential societies, and small businesses, FTTH offers exceptional speed, low latency, and a stable connection for today\'s digital lifestyle.',
    highlight: 'Whether you\'re streaming 4K content, attending online classes, working remotely, gaming, or connecting multiple smart devices — our fiber network ensures a seamless online experience without compromising performance.',
    whyTitle: 'Future-Ready Fiber for Your Home',
    whyDesc: 'With a future-ready infrastructure and professional installation, our FTTH solutions provide reliable connectivity that supports growing bandwidth requirements for years to come.',
    features: [
      'High-speed fiber-optic internet',
      'Stable and reliable connectivity',
      'Low latency for gaming and video calls',
      'Supports multiple connected devices simultaneously',
      'Ideal for streaming, remote work, and online learning',
      'Future-ready fiber infrastructure',
      'Professional installation and technical support',
    ],
    closing: 'Our FTTH services are built to provide consistent performance, superior reliability, and exceptional customer experience — backed by quality infrastructure and responsive support.',
    stats: [
      { value: '1 Gbps', label: 'Max Speed' },
      { value: '4K', label: 'Streaming Ready' },
      { value: 'Low', label: 'Latency' },
      { value: 'Fiber', label: 'Technology' },
    ],
  },
  'network-design': {
    slug: 'network-design',
    icon: 'fas fa-project-diagram',
    color: '#d97706',
    badge: 'Network Infrastructure',
    title: 'Network Design & Support',
    subtitle: 'Build a Secure, Scalable & High-Performance Network',
    intro: 'A well-designed network is the foundation of every successful business. Whether you\'re setting up a new office, expanding infrastructure, or upgrading an existing network, Harmony Internet provides end-to-end Network Design & Support services tailored to your business needs.',
    highlight: 'Our experts analyze your existing infrastructure, understand your operational requirements, and design a network that delivers maximum performance, security, and reliability — from LAN, WAN, and Wi-Fi to structured cabling, switches, routers, and firewalls.',
    whyTitle: 'End-to-End Network Solutions',
    whyDesc: 'Beyond implementation, we provide continuous monitoring, troubleshooting, upgrades, and technical support to keep your network running at peak performance. Scalable solutions built to support growing businesses while minimizing downtime.',
    features: [
      'End-to-end network planning and architecture',
      'LAN, WAN, Wi-Fi & structured cabling solutions',
      'Network implementation and infrastructure upgrades',
      'Performance optimization and health assessment',
      'Secure network design with enterprise-grade equipment',
      'Troubleshooting, maintenance, and ongoing support',
      'Scalable solutions for growing businesses',
    ],
    closing: 'Our experienced networking professionals design solutions that are secure, reliable, and future-ready. From consultation to deployment and ongoing support, Harmony Internet ensures your network is optimized for performance and long-term growth.',
    stats: [
      { value: 'End-to-End', label: 'Planning' },
      { value: 'LAN/WAN', label: 'Solutions' },
      { value: 'Enterprise', label: 'Grade' },
      { value: '24×7', label: 'Support' },
    ],
  },
  'vpn-mpls': {
    slug: 'vpn-mpls',
    icon: 'fas fa-shield-alt',
    color: '#dc2626',
    badge: 'Secure Networking',
    title: 'VPN, MPLS & IPSec Solutions',
    subtitle: 'Secure Connectivity Across Every Business Location',
    intro: 'Modern businesses require secure and reliable communication between offices, data centers, cloud platforms, and remote employees. Harmony Internet provides enterprise-grade VPN, MPLS, and IPSec solutions that connect multiple locations through secure, encrypted networks.',
    highlight: 'Our solutions protect sensitive business data while ensuring seamless communication, secure remote access, and reliable connectivity between branches — Site-to-Site VPN, MPLS for multi-office connectivity, or IPSec tunnels for encrypted communication.',
    whyTitle: 'Secure Every Connection',
    whyDesc: 'By implementing the right network architecture, businesses can improve collaboration, support cloud applications, and ensure secure access to critical resources from anywhere — protecting data while keeping teams connected.',
    features: [
      'Secure Site-to-Site VPN connectivity',
      'MPLS solutions for multi-branch organizations',
      'IPSec encrypted tunnels for secure data transmission',
      'Remote workforce connectivity',
      'Reliable branch-to-branch communication',
      'Low latency and high network availability',
      'Secure access to business applications and cloud services',
    ],
    closing: 'Harmony Internet combines industry expertise with reliable infrastructure to deliver secure networking solutions that protect your business while keeping teams connected — customized to meet your performance and security requirements.',
    stats: [
      { value: 'Encrypted', label: 'Tunnels' },
      { value: 'Multi-Site', label: 'MPLS' },
      { value: 'Remote', label: 'Access' },
      { value: '99.9%', label: 'Availability' },
    ],
  },
  'bandwidth-on-demand': {
    slug: 'bandwidth-on-demand',
    icon: 'fas fa-tachometer-alt',
    color: '#0072ff',
    badge: 'Flexible Connectivity',
    title: 'Bandwidth on Demand',
    subtitle: 'Scale Your Connectivity Whenever Your Business Needs It',
    intro: 'Business bandwidth requirements constantly change. Large file transfers, cloud migrations, virtual events, software deployments, and seasonal traffic often demand additional capacity. Harmony Internet\'s Bandwidth on Demand service allows businesses to increase or decrease bandwidth quickly without replacing existing infrastructure.',
    highlight: 'Instead of investing in permanently higher bandwidth, businesses can scale capacity whenever required — improving operational efficiency and reducing unnecessary costs. Designed for enterprises, data centers, cloud environments, and growing organizations.',
    whyTitle: 'Agile Connectivity for Dynamic Businesses',
    whyDesc: 'Our flexible bandwidth solutions help organizations respond to changing business needs while maintaining uninterrupted performance — always ready for peak demands without over-provisioning.',
    features: [
      'Flexible bandwidth upgrades based on business requirements',
      'Quick provisioning with minimal downtime',
      'Cost-effective pay-for-what-you-need approach',
      'High network reliability and consistent performance',
      'Supports cloud workloads and data-intensive applications',
      'Seamless scalability without infrastructure replacement',
      'Enterprise-grade connectivity backed by expert support',
    ],
    closing: 'We help businesses stay agile with scalable connectivity solutions that adapt to changing workloads. Our reliable infrastructure, fast provisioning, and dedicated support ensure your organization always has the bandwidth it needs.',
    stats: [
      { value: 'Instant', label: 'Scaling' },
      { value: 'Zero', label: 'Infrastructure Change' },
      { value: 'Pay-as', label: 'You Need' },
      { value: '24×7', label: 'Expert Support' },
    ],
  },
  'network-monitoring': {
    slug: 'network-monitoring',
    icon: 'fas fa-chart-line',
    color: '#10b981',
    badge: 'Network Operations',
    title: 'Network Monitoring',
    subtitle: 'Proactive Network Monitoring for Maximum Uptime',
    intro: 'A reliable network is critical to business continuity. Harmony Internet\'s Network Monitoring service provides continuous, real-time monitoring of your network infrastructure to ensure optimal performance, maximum availability, and quick issue resolution before problems impact your business.',
    highlight: 'Our monitoring solutions provide complete visibility into your network — tracking bandwidth usage, device health, traffic patterns, and overall performance. By identifying potential issues early, we help reduce downtime and ensure business applications remain available when you need them most.',
    whyTitle: 'Prevent Issues Before They Happen',
    whyDesc: 'With proactive monitoring and rapid response from our technical team, businesses can focus on their operations while we ensure the network remains secure, stable, and efficient.',
    features: [
      '24×7 real-time network monitoring',
      'Proactive fault detection and alerts',
      'Bandwidth and traffic analysis',
      'Device health and performance monitoring',
      'Reduced downtime through faster issue resolution',
      'Improved network reliability and availability',
      'Detailed reporting and performance insights',
      'Dedicated technical support',
    ],
    closing: 'At Harmony Internet, we don\'t just respond to network issues — we work to prevent them. Our proactive monitoring approach helps businesses maintain high availability, improve operational efficiency, and deliver a seamless digital experience.',
    stats: [
      { value: '24×7', label: 'Real-Time Monitoring' },
      { value: 'Proactive', label: 'Fault Detection' },
      { value: 'Zero', label: 'Downtime Goal' },
      { value: 'Detailed', label: 'Reporting' },
    ],
  },
  'network-consulting': {
    slug: 'network-consulting',
    icon: 'fas fa-lightbulb',
    color: '#f59e0b',
    badge: 'Expert Guidance',
    title: 'Network Consulting',
    subtitle: 'Expert Network Solutions Designed Around Your Business',
    intro: 'Every business has unique networking requirements, and choosing the right infrastructure is essential for long-term growth. Harmony Internet offers Network Consulting services to help organizations design, optimize, and modernize their network infrastructure with solutions that are secure, scalable, and future-ready.',
    highlight: 'Our consultants work closely with your team to assess your existing network, understand your business objectives, and recommend the most effective technologies to improve performance, security, and operational efficiency.',
    whyTitle: 'Informed Decisions, Better Networks',
    whyDesc: 'Whether planning a new network, expanding infrastructure, migrating to the cloud, or upgrading an existing environment — we provide expert guidance at every stage, combining industry best practices with practical experience.',
    features: [
      'Network assessment and infrastructure planning',
      'Enterprise network architecture and design',
      'Network performance optimization',
      'Security and infrastructure consulting',
      'Cloud networking and connectivity guidance',
      'Technology planning for future scalability',
      'Deployment strategy and implementation support',
      'Ongoing technical consultation',
    ],
    closing: 'Harmony Internet delivers practical, business-focused networking solutions backed by experienced professionals. Our consulting services help organizations make informed technology decisions, optimize performance, and build a secure, resilient infrastructure for future growth.',
    stats: [
      { value: 'Expert', label: 'Consultants' },
      { value: 'End-to-End', label: 'Guidance' },
      { value: 'Future', label: 'Ready Design' },
      { value: 'Best', label: 'Practices' },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = serviceData[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!svc) return <Navigate to="/services" replace />;

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="svc-hero" style={{ '--svc-color': svc.color }}>
        <div className="svc-hero-bg" />
        <div className="svc-hero-content" data-aos="fade-up">
          <div className="svc-hero-badge">
            <i className={svc.icon} /> {svc.badge}
          </div>
          <h1>{svc.title}</h1>
          <p>{svc.subtitle}</p>
          <div className="svc-hero-actions">
            <Link to="/contact" className="btn-primary">
              Get a Quote <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/services" className="btn-ghost">
              ← All Services
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="svc-stats-strip">
          {svc.stats.map((s, i) => (
            <div key={i} className="svc-stat">
              <div className="svc-stat-val">{s.value}</div>
              <div className="svc-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="svc-body">
        <div className="svc-body-inner">

          {/* Intro */}
          <div className={`svc-intro ${svc.image ? 'svc-intro-with-image' : ''}`} data-aos="fade-up">
            <div className="svc-intro-text-col">
              <p className="svc-intro-text">{svc.intro}</p>
              <blockquote className="svc-highlight" style={{ borderColor: svc.color }}>
                {svc.highlight}
              </blockquote>
            </div>
            {svc.image && (
              <div className="svc-intro-img-wrap">
                <img src={svc.image} alt={svc.title} className="svc-intro-img" />
                <div className="svc-intro-img-glow" style={{ background: `radial-gradient(ellipse, ${svc.color}20 0%, transparent 70%)` }} />
              </div>
            )}
          </div>

          <div className="svc-two-col">
            {/* Why section */}
            <div className="svc-why" data-aos="fade-right">
              <h2>{svc.whyTitle}</h2>
              <p>{svc.whyDesc}</p>
              <Link to="/contact" className="svc-contact-link" style={{ color: svc.color }}>
                Talk to an Expert <i className="fas fa-arrow-right" />
              </Link>
            </div>

            {/* Features */}
            <div className="svc-features-card" data-aos="fade-left" style={{ '--svc-color': svc.color }}>
              <h3>Key Features &amp; Benefits</h3>
              <ul>
                {svc.features.map((f, i) => (
                  <li key={i}>
                    <i className="fas fa-check-circle" style={{ color: svc.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gallery — if service has extra images */}
          {svc.gallery && svc.gallery.length > 0 && (
            <div className="svc-gallery" data-aos="fade-up">
              <div className="svc-gallery-grid">
                {svc.gallery.map((img, i) => (
                  <div key={i} className="svc-gallery-card" data-aos="fade-up" data-aos-delay={i * 100}>
                    <div className="svc-gallery-img-wrap">
                      <img src={img.src} alt={img.caption} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Closing */}
          <div className="svc-closing" data-aos="fade-up">
            <div className="svc-closing-icon" style={{ background: `${svc.color}15`, color: svc.color }}>
              <i className={svc.icon} />
            </div>
            <div>
              <h3>Why Harmony Internet?</h3>
              <p>{svc.closing}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Other services — infinite ticker */}
      <section className="svc-other">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">Explore More</span>
          <h2>Our Other Services</h2>
        </div>

        <div className="svc-other-ticker-wrap">
          <div className="svc-other-fade svc-other-fade-left" />
          <div className="svc-other-ticker">
            {[...Object.values(serviceData).filter(s => s.slug !== slug),
              ...Object.values(serviceData).filter(s => s.slug !== slug)
            ].map((s, i) => (
              <Link
                key={i}
                to={`/services/${s.slug}`}
                className="svc-other-card"
                style={{ '--svc-color': s.color }}
              >
                <div className="svc-other-icon" style={{ color: s.color, background: `${s.color}15` }}>
                  <i className={s.icon} />
                </div>
                <h4>{s.title}</h4>
                <p>{s.subtitle}</p>
                <span className="svc-other-link">Learn more →</span>
              </Link>
            ))}
          </div>
          <div className="svc-other-fade svc-other-fade-right" />
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta" style={{ '--svc-color': svc.color }}>
        <div data-aos="fade-up">
          <h2>Ready to Get Started?</h2>
          <p>Our team is ready to design the perfect solution for your business.</p>
          <div className="svc-cta-actions">
            <Link to="/contact" className="btn-primary">
              Contact Us <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/plans" className="btn-ghost">View Plans</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
