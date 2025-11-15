import React from 'react';
import type { ResearchData } from '../types';

interface Props {
    tableData: ResearchData['comparativeTable'];
}

export const ComparativeTable: React.FC<Props> = ({ tableData }) => {
    return (
        <section>
            <h3 className="text-2xl font-bold text-text-primary mb-6">Comparative Analysis</h3>
            <div className="overflow-x-auto glass-card rounded-2xl p-1">
                <table className="w-full text-base text-left text-text-secondary">
                    <thead className="text-sm text-text-primary uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-4 rounded-tl-xl">Topic / Domain</th>
                            <th scope="col" className="px-6 py-4">Impact Strength</th>
                            <th scope="col" className="px-6 py-4">Type of Effect</th>
                            <th scope="col" className="px-6 py-4 rounded-tr-xl">Citations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, i) => (
                            <tr key={i} className="border-t border-border">
                                <th scope="row" className="px-6 py-4 font-semibold text-text-primary whitespace-nowrap">{row.topic}</th>
                                <td className="px-6 py-4">{row.impactStrength}</td>
                                <td className="px-6 py-4">{row.effectType}</td>
                                <td className="px-6 py-4">{row.citationCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};