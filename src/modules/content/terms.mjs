/**
 * @typedef {Object} Term
 * @property {string} id
 * @property {string} term
 * @property {string} category
 * @property {string} icon    - key into ICONS (see icons.mjs)
 * @property {string} definition
 * @property {string} [example]
 */

export const CATEGORY_COLORS = {
  "Cells & Structures": "#7DF9C4",
  "Divisions": "#B79CFF",
  "Signals & Function": "#FFB25E",
};

const FALLBACK_COLORS = ["#7DF9C4", "#B79CFF", "#FFB25E", "#6FD3FF", "#FF9CD4"];

/** @type {(category: string) => string} */
export function colorForCategory(category) {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}

/** @type {Term[]} */
export const SEED_TERMS = [
  { id: "neuron", term: "Neuron", category: "Cells & Structures", icon: "neuron",
    definition: "A nerve cell built to receive and send electrical and chemical signals. It's the basic working unit of the whole nervous system.",
    example: "A single neuron can connect to thousands of other neurons through its branches." },
  { id: "dendrite", term: "Dendrite", category: "Cells & Structures", icon: "neuron",
    definition: "A short, branching extension of a neuron that receives signals from other cells and carries them toward the cell body.",
    example: "Dendrites look like tree branches reaching out to catch incoming signals." },
  { id: "axon", term: "Axon", category: "Cells & Structures", icon: "neuron",
    definition: "A long, slender fiber that carries an electrical signal away from the neuron's cell body toward other cells.",
    example: "Some axons in the leg stretch over a meter long, from the spine to the toes." },
  { id: "myelin", term: "Myelin Sheath", category: "Cells & Structures", icon: "myelin",
    definition: "A fatty layer wrapped around many axons that insulates them, letting signals travel much faster and more efficiently.",
    example: "Gaps in the myelin, called nodes of Ranvier, let the signal 'jump' down the axon." },
  { id: "synapse", term: "Synapse", category: "Cells & Structures", icon: "synapse",
    definition: "The junction where one neuron passes a signal to the next cell, usually across a tiny gap using chemical messengers.",
    example: "Every thought and reflex depends on signals crossing synapses in the right order." },
  { id: "synapticcleft", term: "Synaptic Cleft", category: "Cells & Structures", icon: "synapse",
    definition: "The narrow gap between two neurons at a synapse, which neurotransmitters must cross to pass the signal along.",
    example: "The synaptic cleft is only about 20 nanometers wide, yet it's crucial for communication." },
  { id: "neurotransmitter", term: "Neurotransmitter", category: "Cells & Structures", icon: "synapse",
    definition: "A chemical messenger released by a neuron that crosses the synapse to trigger a response in the next cell.",
    example: "Dopamine and serotonin are neurotransmitters that affect mood and motivation." },
  { id: "neuroglia", term: "Neuroglia (Glial Cells)", category: "Cells & Structures", icon: "cell",
    definition: "Support cells that protect, nourish, and insulate neurons, helping keep the nervous system running smoothly.",
    example: "Glial cells outnumber neurons in the brain, though they don't send electrical signals themselves." },
  { id: "cns", term: "Central Nervous System (CNS)", category: "Divisions", icon: "brain",
    definition: "The brain and spinal cord together, which process information and coordinate the body's responses.",
    example: "The CNS acts like command central, deciding how the body should react." },
  { id: "pns", term: "Peripheral Nervous System (PNS)", category: "Divisions", icon: "cable",
    definition: "All the nerves outside the brain and spinal cord, connecting the CNS to the rest of the body.",
    example: "The PNS carries the CNS's decisions out to your muscles and glands." },
  { id: "somatic", term: "Somatic Nervous System", category: "Divisions", icon: "cable",
    definition: "The part of the PNS that controls voluntary movements, like moving your arm or blinking on command.",
    example: "Deciding to wave hello uses the somatic nervous system." },
  { id: "autonomic", term: "Autonomic Nervous System", category: "Divisions", icon: "cable",
    definition: "The part of the PNS that controls involuntary functions, such as heartbeat, digestion, and breathing rate.",
    example: "You don't have to think about your heartbeat — the autonomic system handles it." },
  { id: "actionpotential", term: "Action Potential", category: "Signals & Function", icon: "pulse",
    definition: "A rapid change in electrical charge that travels along a neuron's axon, carrying its signal from one end to the other.",
    example: "An action potential is an all-or-nothing event — it either fires fully or not at all." },
  { id: "reflexarc", term: "Reflex Arc", category: "Signals & Function", icon: "pulse",
    definition: "A quick, automatic pathway that lets the spinal cord trigger a response before the signal even reaches the brain.",
    example: "Pulling your hand off a hot stove instantly is thanks to a reflex arc." },
];
