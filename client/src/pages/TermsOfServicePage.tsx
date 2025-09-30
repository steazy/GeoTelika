export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-foreground" data-testid="heading-terms-title">
          Terms of Service
        </h1>
        
        <div className="mb-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Effective Date:</strong> January 1, 2025
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Agreement to Terms</h2>
          <p className="mb-4">
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "you," or "your") 
            and Geotelika ("Company," "we," "us," or "our") regarding your use of our IT business services, support platform, 
            and related technologies (collectively, the "Services").
          </p>
          <p className="mb-4">
            By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by 
            these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Service Description</h2>
          
          <h3 className="text-xl font-semibold mb-3">2.1 IT Services Offered</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Server Management:</strong> Setup, maintenance, monitoring, and optimization</li>
            <li><strong>Cybersecurity Services:</strong> Threat detection, data encryption, security audits</li>
            <li><strong>Cloud Solutions:</strong> Migration, backup, scalability planning</li>
            <li><strong>Network Infrastructure:</strong> Design, implementation, WiFi setup, VPN configuration</li>
            <li><strong>Data Management:</strong> Backup, recovery, disaster recovery, analytics</li>
            <li><strong>24/7 IT Support:</strong> Ticket management, remote assistance, priority support</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Service Availability</h3>
          <p className="mb-4">
            Services are provided on a continuous basis with the following availability commitments:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Standard Services:</strong> 99.9% uptime (excluding scheduled maintenance)</li>
            <li><strong>Critical Systems:</strong> 99.99% uptime with 4-hour recovery time objective</li>
            <li><strong>Support Platform:</strong> 24/7 availability with tiered response times</li>
            <li><strong>Emergency Support:</strong> Available outside business hours for critical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. Client Responsibilities</h2>
          
          <h3 className="text-xl font-semibold mb-3">3.1 Account Management</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate and complete information when creating accounts</li>
            <li>Maintain confidentiality of account credentials and access information</li>
            <li>Notify us immediately of any unauthorized access or security breaches</li>
            <li>Ensure compliance with your organization's IT policies and procedures</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.2 Data and System Access</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide necessary access credentials and permissions for service delivery</li>
            <li>Maintain current backups of critical data independent of our services</li>
            <li>Ensure your systems meet minimum requirements for our services</li>
            <li>Cooperate with security protocols and access procedures</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.3 Acceptable Use</h3>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use our Services for illegal activities or to violate any laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems or other clients' data</li>
            <li>Interfere with or disrupt the integrity or performance of our Services</li>
            <li>Upload or transmit malicious code, viruses, or harmful content</li>
            <li>Use our Services to send spam, phishing attempts, or unsolicited communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Service Level Agreements (SLAs)</h2>
          
          <h3 className="text-xl font-semibold mb-3">4.1 Response Time Commitments</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="border border-border p-3 text-left">Severity Level</th>
                  <th className="border border-border p-3 text-left">Description</th>
                  <th className="border border-border p-3 text-left">Response Time</th>
                  <th className="border border-border p-3 text-left">Resolution Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Critical</td>
                  <td className="border border-border p-3">Production system down</td>
                  <td className="border border-border p-3">15 minutes</td>
                  <td className="border border-border p-3">4 hours</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">High</td>
                  <td className="border border-border p-3">Major functionality impaired</td>
                  <td className="border border-border p-3">2 hours</td>
                  <td className="border border-border p-3">8 hours</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Medium</td>
                  <td className="border border-border p-3">Minor functionality issues</td>
                  <td className="border border-border p-3">8 hours</td>
                  <td className="border border-border p-3">24 hours</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Low</td>
                  <td className="border border-border p-3">General questions/requests</td>
                  <td className="border border-border p-3">24 hours</td>
                  <td className="border border-border p-3">72 hours</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3">4.2 Availability Guarantees</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>99.9% - 99.0%:</strong> 10% monthly service credit</li>
            <li><strong>99.0% - 95.0%:</strong> 25% monthly service credit</li>
            <li><strong>Below 95.0%:</strong> 50% monthly service credit</li>
            <li><strong>Maximum Credit:</strong> 100% of monthly service fees</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">4.3 SLA Exclusions</h3>
          <p className="mb-4">SLA commitments do not apply to downtime caused by:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Scheduled maintenance (maximum 4 hours/month with 48-hour notice)</li>
            <li>Client-caused issues, misconfigurations, or unauthorized changes</li>
            <li>Third-party service dependencies beyond our control</li>
            <li>Force majeure events, natural disasters, or government actions</li>
            <li>DDoS attacks, security incidents, or external cyber threats</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Data Security and Protection</h2>
          
          <h3 className="text-xl font-semibold mb-3">5.1 Security Measures</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Encryption:</strong> AES-256 encryption at rest, TLS 1.3 for data in transit</li>
            <li><strong>Access Controls:</strong> Multi-factor authentication and role-based permissions</li>
            <li><strong>Network Security:</strong> Firewall protection, intrusion detection systems</li>
            <li><strong>Monitoring:</strong> 24/7 security monitoring and incident response</li>
            <li><strong>Compliance:</strong> SOC 2 Type II, ISO 27001 certified security practices</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">5.2 Data Processing and Storage</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Client data processed only as necessary for service delivery</li>
            <li>Data stored in geographically appropriate, secure data centers</li>
            <li>Regular automated backups with 99.999999999% durability guarantee</li>
            <li>Data retention policies aligned with legal and business requirements</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">5.3 Incident Response</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Security incidents reported within 24 hours of detection</li>
            <li>Data breach notifications within 72 hours (GDPR requirement)</li>
            <li>Comprehensive incident investigation and remediation</li>
            <li>Post-incident analysis and security improvements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Payment and Billing</h2>
          
          <h3 className="text-xl font-semibold mb-3">6.1 Service Fees</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Service fees as specified in your service agreement or proposal</li>
            <li>Monthly billing cycle unless otherwise agreed</li>
            <li>Payment due within 30 days of invoice date</li>
            <li>Late payment fees of 1.5% per month on overdue amounts</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">6.2 Changes to Fees</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Fee changes require 60 days written notice</li>
            <li>Existing contracts honored for their duration</li>
            <li>Right to terminate services if fee changes are unacceptable</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Intellectual Property</h2>
          
          <h3 className="text-xl font-semibold mb-3">7.1 Company IP</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>All rights to our software, systems, and methodologies remain with Geotelika</li>
            <li>Clients receive a limited license to use our Services during the service term</li>
            <li>No transfer of ownership rights in our proprietary technologies</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">7.2 Client Data and IP</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Clients retain all rights to their data and intellectual property</li>
            <li>We process client data solely for service delivery purposes</li>
            <li>No rights claimed over client systems, data, or business processes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Limitation of Liability</h2>
          
          <h3 className="text-xl font-semibold mb-3">8.1 Service Limitations</h3>
          <p className="mb-4">
            Services are provided "AS IS" without warranties of any kind. While we strive for excellence, 
            we cannot guarantee uninterrupted or error-free service.
          </p>

          <h3 className="text-xl font-semibold mb-3">8.2 Liability Limits</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Total liability limited to service fees paid in the 12 months preceding the claim</li>
            <li>No liability for indirect, consequential, or punitive damages</li>
            <li>Service credits as the exclusive remedy for SLA breaches</li>
            <li>Force majeure events exclude all liability</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">8.3 Indemnification</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Each party indemnifies the other for their respective negligent acts</li>
            <li>Client indemnifies us for misuse of services or policy violations</li>
            <li>We indemnify clients for our breach of data protection obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. Term and Termination</h2>
          
          <h3 className="text-xl font-semibold mb-3">9.1 Service Term</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Services continue until terminated by either party</li>
            <li>Minimum service commitments as specified in service agreements</li>
            <li>Automatic renewal unless terminated with proper notice</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">9.2 Termination Rights</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Either party may terminate with 30 days written notice</li>
            <li>Immediate termination for material breach or non-payment</li>
            <li>Termination for convenience with appropriate notice period</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">9.3 Post-Termination</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Data export assistance provided for 30 days after termination</li>
            <li>Secure data deletion within 90 days unless otherwise required</li>
            <li>Outstanding fees remain due and payable</li>
            <li>Survival of confidentiality and limitation of liability provisions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">10. Compliance and Regulatory</h2>
          
          <h3 className="text-xl font-semibold mb-3">10.1 Data Protection Compliance</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>GDPR compliance for EU data subjects</li>
            <li>CCPA compliance for California residents</li>
            <li>HIPAA compliance for healthcare clients (where applicable)</li>
            <li>SOX compliance for financial services clients</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">10.2 Industry Standards</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>ITIL framework for service management</li>
            <li>NIST Cybersecurity Framework implementation</li>
            <li>ISO 27001 information security standards</li>
            <li>SOC 2 Type II for service organization controls</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">11. Dispute Resolution</h2>
          
          <h3 className="text-xl font-semibold mb-3">11.1 Governing Law</h3>
          <p className="mb-4">
            These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles.
          </p>

          <h3 className="text-xl font-semibold mb-3">11.2 Dispute Resolution Process</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Direct Negotiation:</strong> Good faith effort to resolve disputes directly</li>
            <li><strong>Mediation:</strong> Non-binding mediation before arbitration</li>
            <li><strong>Arbitration:</strong> Binding arbitration through the American Arbitration Association</li>
            <li><strong>Jurisdiction:</strong> Federal and state courts in Santa Clara County, California</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">12. Modifications and Updates</h2>
          <p className="mb-4">
            We may update these Terms to reflect changes in our services, legal requirements, or business practices. 
            Material changes will be communicated through:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Email notification to registered users</li>
            <li>Posted updates on our website</li>
            <li>In-service notifications for significant changes</li>
            <li>60 days notice for changes affecting existing contracts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">13. Contact Information</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="mb-4">
              <strong>Legal Department:</strong><br />
              Geotelika Legal Affairs<br />
              123 Tech Boulevard<br />
              Silicon Valley, CA 94025
            </p>
            <p className="mb-4">
              <strong>General Inquiries:</strong><br />
              Email: legal@geotelika.com<br />
              Phone: (555) 123-4567<br />
              Business Hours: Monday-Friday, 8AM-6PM PST
            </p>
            <p className="mb-0">
              <strong>Service Issues:</strong><br />
              Email: support@geotelika.com<br />
              Emergency Hotline: (555) 911-TECH<br />
              Available 24/7 for critical issues
            </p>
          </div>
        </section>

        <div className="border-t pt-8 mt-12">
          <p className="text-sm text-muted-foreground text-center">
            By using our Services, you acknowledge that you have read and understood these Terms of Service 
            and agree to be bound by them. These Terms represent the complete agreement between you and Geotelika 
            regarding your use of our Services.
          </p>
        </div>
      </div>
    </div>
  );
}