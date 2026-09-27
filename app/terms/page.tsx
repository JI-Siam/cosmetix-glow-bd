"use client";

import SubPageHeader from "@/components/layout/SubPageHeader";

export default function TermsPage() {
    return (
        <div className="bg-brand-dark min-h-screen text-brand-light font-sans">
            <SubPageHeader
                title="Terms & Conditions"
                subtitle="Service Agreement"
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
                            These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Cometix Glow Bd accessible at cometixglowbd.com.
                        </p>
                    </div>

                    {/* Intellectual Property Rights */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            2. Intellectual Property Rights
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg mb-4">
                            Other than the content you own, under these Terms, Cometix Glow Bd and/or its licensors own all the intellectual property rights and materials contained in this Website.
                        </p>
                        <p className="text-brand-cream/80 leading-relaxed text-lg">
                            You are granted limited license only for purposes of viewing the material contained on this Website.
                        </p>
                    </div>

                    {/* Restrictions */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            3. Restrictions
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg mb-4">
                            You are specifically restricted from all of the following:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-brand-cream/80 leading-relaxed">
                            <li>publishing any Website material in any other media;</li>
                            <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                            <li>publicly performing and/or showing any Website material;</li>
                            <li>using this Website in any way that is or may be damaging to this Website;</li>
                            <li>using this Website in any way that impacts user access to this Website;</li>
                        </ul>
                    </div>

                    {/* Limitation of Liability */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            4. Limitation of Liability
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg">
                            In no event shall Cometix Glow Bd, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Cometix Glow Bd, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                        </p>
                    </div>

                    {/* Governing Law & Jurisdiction */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6 uppercase tracking-wider">
                            5. Governing Law & Jurisdiction
                        </h2>
                        <p className="text-brand-cream/80 leading-relaxed text-lg">
                            These Terms will be governed by and interpreted in accordance with the laws of Bangladesh, and you submit to the non-exclusive jurisdiction of the courts of Bangladesh for the resolution of any disputes.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
