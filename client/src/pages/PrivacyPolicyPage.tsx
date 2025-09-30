export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-foreground" data-testid="heading-privacy-title">
          Privacy Policy
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
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
          <p className="mb-4">
            Geotelika ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal data. 
            This Privacy Policy explains how we collect, use, process, and safeguard your information when you use our IT business 
            services, support platform, and website (collectively, the "Services").
          </p>
          <p className="mb-4">
            As an IT services provider, we understand the critical importance of data protection and comply with applicable privacy 
            laws including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other 
            relevant data protection regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide Directly</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, phone number, company details, job title</li>
            <li><strong>Contact Information:</strong> When you contact us for support or inquiries</li>
            <li><strong>Service Requests:</strong> Technical details, system configurations, and issue descriptions in support tickets</li>
            <li><strong>Payment Information:</strong> Billing details processed through secure third-party payment processors</li>
            <li><strong>Communications:</strong> Messages, feedback, and correspondence with our support team</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Usage Data:</strong> How you interact with our Services, features used, and time spent</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
            <li><strong>Performance Data:</strong> System performance metrics, error logs, and diagnostic information</li>
            <li><strong>Security Data:</strong> Access logs, authentication attempts, and security-related events</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.3 Information from Third Parties</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Integration Partners:</strong> Data from integrated third-party services you authorize</li>
            <li><strong>Service Providers:</strong> Information from payment processors, analytics providers, and security services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Your Information</h2>
          
          <h3 className="text-xl font-semibold mb-3">3.1 Service Provision</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Deliver and maintain our IT services and support platform</li>
            <li>Process and respond to support tickets and service requests</li>
            <li>Monitor system performance and resolve technical issues</li>
            <li>Provide remote IT support and maintenance services</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.2 Security and Compliance</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Protect against unauthorized access, fraud, and security threats</li>
            <li>Comply with legal obligations and regulatory requirements</li>
            <li>Conduct security audits and vulnerability assessments</li>
            <li>Implement data backup and disaster recovery procedures</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.3 Communication and Improvement</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Send service updates, security alerts, and maintenance notifications</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Analyze usage patterns to improve our services</li>
            <li>Send promotional materials (with your consent where required)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Legal Basis for Processing</h2>
          <p className="mb-4">
            Under GDPR, we process your personal data based on the following legal grounds:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Contract Performance:</strong> Processing necessary to fulfill our service agreements</li>
            <li><strong>Legitimate Interest:</strong> For security, fraud prevention, and service improvement</li>
            <li><strong>Legal Obligation:</strong> Compliance with applicable laws and regulations</li>
            <li><strong>Consent:</strong> For marketing communications and optional features (where required)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Data Sharing and Disclosure</h2>
          
          <h3 className="text-xl font-semibold mb-3">5.1 Service Providers</h3>
          <p className="mb-4">
            We may share your information with trusted third-party service providers who assist us in delivering our services:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Cloud infrastructure providers (with appropriate data processing agreements)</li>
            <li>Payment processing services</li>
            <li>Security and monitoring services</li>
            <li>Analytics and performance monitoring tools</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">5.2 Legal Requirements</h3>
          <p className="mb-4">
            We may disclose your information when required by law, legal process, or to protect our rights and those of our users.
          </p>

          <h3 className="text-xl font-semibold mb-3">5.3 Business Transfers</h3>
          <p className="mb-4">
            In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business assets.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Data Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your data:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Encryption:</strong> Data encrypted in transit using TLS 1.3 and at rest using AES-256</li>
            <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access permissions</li>
            <li><strong>Network Security:</strong> Firewalls, intrusion detection, and DDoS protection</li>
            <li><strong>Regular Audits:</strong> Security assessments, penetration testing, and compliance reviews</li>
            <li><strong>Incident Response:</strong> 24/7 monitoring with rapid response procedures</li>
            <li><strong>Staff Training:</strong> Regular security awareness training for all personnel</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Data Retention</h2>
          <p className="mb-4">
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Data:</strong> Retained during active service period and 30 days after termination</li>
            <li><strong>Support Tickets:</strong> Retained for 3 years for service improvement and compliance</li>
            <li><strong>Security Logs:</strong> Retained for 1 year for security and fraud prevention</li>
            <li><strong>Financial Records:</strong> Retained for 7 years as required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Your Rights</h2>
          
          <h3 className="text-xl font-semibold mb-3">8.1 GDPR Rights (EU Residents)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Restriction:</strong> Limit how we process your data</li>
            <li><strong>Portability:</strong> Receive your data in a portable format</li>
            <li><strong>Object:</strong> Object to certain types of processing</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">8.2 CCPA Rights (California Residents)</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Know:</strong> What personal information we collect and how it's used</li>
            <li><strong>Delete:</strong> Request deletion of your personal information</li>
            <li><strong>Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell data)</li>
            <li><strong>Non-Discrimination:</strong> Equal service regardless of exercising your rights</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">8.3 Exercising Your Rights</h3>
          <p className="mb-4">
            To exercise your rights, contact us at <strong>privacy@geotelika.com</strong> or use our online request form. 
            We will respond within the required timeframes (30 days for GDPR, 45 days for CCPA).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. International Data Transfers</h2>
          <p className="mb-4">
            Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Standard Contractual Clauses (SCCs) for GDPR compliance</li>
            <li>Adequacy decisions for approved countries</li>
            <li>Additional security measures for high-risk transfers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">10. Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar technologies to enhance your experience:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for service functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand usage patterns (with your consent)</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p className="mb-4">
            You can manage cookie preferences through your browser settings or our cookie management tool.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">11. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy to reflect changes in our practices or legal requirements. 
            We will notify you of material changes by:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Posting an updated policy on our website</li>
            <li>Sending email notifications to registered users</li>
            <li>Providing in-service notifications for significant changes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">12. Contact Information</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="mb-4">
              <strong>Data Protection Officer:</strong><br />
              Geotelika Data Protection Office<br />
              123 Tech Boulevard<br />
              Silicon Valley, CA 94025
            </p>
            <p className="mb-4">
              <strong>Email:</strong> privacy@geotelika.com<br />
              <strong>Phone:</strong> (555) 123-4567<br />
              <strong>Response Time:</strong> Within 72 hours for privacy inquiries
            </p>
            <p className="mb-0">
              <strong>EU Representative (if applicable):</strong><br />
              For EU residents, you may also contact our EU representative at eu-privacy@geotelika.com
            </p>
          </div>
        </section>

        <div className="border-t pt-8 mt-12">
          <p className="text-sm text-muted-foreground text-center">
            This Privacy Policy is designed to be transparent and comprehensive. 
            If you have questions about any section, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}