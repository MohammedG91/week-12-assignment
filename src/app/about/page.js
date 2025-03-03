import Image from "next/image";

export default function About() {
  return (
    <div className="w-full bg-[#F4EDD3] text-gray-900">
      <section className="w-full relative bg-[#134b70] text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Story & Mission</h1>
        <p className="max-w-2xl mx-auto text-lg">
          We believe in the power of skill-sharing. Our mission is to connect
          people, empower learners, and build a community of knowledge exchange.
        </p>
      </section>

      <section className="w-full py-16 px-6 bg-[#508c9b]">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Meet the Team
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#7E99A3] shadow-lg p-6 rounded-lg text-center"
            >
              <Image
                src={member.image}
                width={100}
                height={100}
                alt={member.name}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-[#4C585B]">
                {member.name}
              </h3>
              <p className="text-[#A5BFCC]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#F4EDD3] py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-[#134b70] mb-4">
          Why Skill-Sharing Matters
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-[#4C585B]">
          Learning from peers fosters collaboration, strengthens communities,
          and opens doors to new opportunities. Let’s grow together.
        </p>
      </section>
    </div>
  );
}

const teamMembers = [
  { id: 1, name: "Mohammed", role: "CEO", image: "/team/mohammed.jpg" },
  { id: 2, name: "Amina", role: "CTO", image: "/team/amina.jpg" },
  { id: 3, name: "Sita", role: "COO", image: "/team/sita.jpg" },
  { id: 4, name: "Jae", role: "CMO", image: "/team/jae.jpg" },
];
