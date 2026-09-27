"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";

export default function PrivacyPage() {
    return (
        <div className="bg-brand-dark min-h-screen text-brand-light font-sans">
            <SubPageHeader
                title="Privacy Policy"
                subtitle="Your Data Protection"
                backgroundImage="/images/hero/hero-bundle.svg"
            />

            <section className="py-20 px-6 max-w-4xl mx-auto">
                <div className="space-y-12">
                    {/* Introduction */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            1. Introduction
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg">
                            At Cometix Glow Bd, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </div>

                    {/* Data We Collect */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            2. Data We Collect
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg mb-4">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-brand-cream/80 leading-relaxed">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                        </ul>
                    </div>

                    {/* How We Use Your Data */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            3. How We Use Your Data
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg mb-4">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-brand-cream/80 leading-relaxed">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </div>

                    {/* Data Security */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            4. Data Security
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            5. Contact Us
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg">
                            If you have any questions about this privacy policy or our privacy practices, please contact us via our Contact page.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
