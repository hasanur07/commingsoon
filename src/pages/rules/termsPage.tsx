import api from "@/api";
import { ThemeSwitch } from "@/components/theme-switch";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";

interface Section {
    heading: string;
    contents: string[];
}

interface Policy {
    title: string;
    effectiveDate: string;
    conditions: Section[];
}

export default function TermsPage() {
    const [policy, setPolicy] = useState<Policy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPolicy() {
            try {
                const res = await api.post("/policy/getPolicy", { type: "terms" });
                const data: Policy = res.data;
                setPolicy(data);
            } catch (err) {
                console.error("Failed to load terms policy", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPolicy();
    }, []);

    if (loading) return <p className="p-4 flex justify-center items-center w-screen h-screen">
        <Spinner size="lg" />
    </p>;
    if (!policy) return <p className="p-4">Terms Policy not available.</p>;

    return (
        <div className="mx-auto p-6 md:p-10 md:px-96 rounded-xl overflow-scroll h-screen">
            <h1 className="text-2xl font-bold mt-4 mb-2">{policy.title}</h1>
            <p className="text-sm opacity-50 mb-6">
                Effective Date: {new Date(policy.effectiveDate).toLocaleDateString()}
            </p>
            <span className="flex mb-6">Welcome to DocLet. By using our Service, you agree to these Terms & Conditions ("Terms").</span>

            {policy.conditions.map((section, idx) => (
                <div key={idx} className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">{section.heading}</h2>
                    <ul className="list-disc list-inside space-y-1 opacity-70">
                        {section.contents.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <ThemeSwitch className="opacity-0" />
        </div>
    );
}