const accountId = props.accountId ?? context.accountId;
const jobPostingMarkdown = `
# Research Intern (Hiring)
Company: Marma J Labs

Location: Antigua and Barbuda

Duration: Summer Internship (May - September)

Compensation: $10-15 per hour in XCD (Eastern Caribbean Dollars)

## About Marma J Labs

Marma J Labs is a tech-based non-profit organization that aims to educate and empower young tech founders in the twin island nation of Antigua and Barbuda. We focus on supporting innovative research projects in the areas of blockchain, cryptography, and general web3 technologies, with a strong emphasis on the NEAR Protocol ecosystem. One of our key projects includes the Marma J Gaming project.

We are currently seeking highly motivated and passionate research interns to join our Founder Development Program for a summer internship opportunity.

## Responsibilities

- Collaborate with the Marma J Labs team on research projects related to blockchain, cryptography, and web3 technologies.
- Contribute to the development of the Marma J Gaming project.
- Engage in hands-on learning experiences and work on real-world projects.
- Attend regular mentorship sessions and receive guidance from industry experts.
- Develop and refine the skills needed to become a successful tech founder.

## Requirements

- Currently enrolled in or recently graduated from a Computer Science or related program.
- Strong interest in blockchain, cryptography, and web3 technologies.
- Passion for building tech products and a desire to grow as a tech founder.
- Excellent communication and teamwork skills.

## Benefits

- Paid internship with competitive hourly rates.
- Opportunity to work on cutting-edge research projects in the blockchain and web3 space.
- Receive mentorship and support from industry experts to help you transition into a successful tech founder.
- Develop your skills and experience in a supportive and educational environment.
- Potential for long-term career opportunities with Marma J Labs and its projects.

## How to Apply

Please complete the application form on the [Marma J Labs](https://marmaj.org/labs/) page of the Marma J Foundation website to apply for this position.

## Application Deadline

We are reviewing applications on a rolling basis, so we encourage interested candidates to apply as soon as possible, as positions may fill up quickly.

Join Marma J Labs and contribute to the future of tech innovation in Antigua and Barbuda while setting yourself up for success as a tech founder! We look forward to reviewing your application.
`;

if (!accountId) {
  return (
    <div>
      <p>Please connect your NEAR wallet or create a new one:</p>
      <a href="https://shard.dog/go" target="_blank" rel="noreferrer">
        <button>Create NEAR Wallet</button>
      </a>
    </div>
  );
}

return (
  <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
    <div className="mb-3">
      <h1>Marma J Labs</h1>
      <h2>Projects:</h2>

      <a
        href="https://marmaj.org/gaming"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button>Marma J Gaming</button>
      </a>
      <a
        href="https://allie-marketplace.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button>Allies Marketplace</button>
      </a>
      <p>
        Join the Marma J Labs community on Telegram:{" "}
        <a
          href="https://t.me/marmajdao/17452"
          target="_blank"
          rel="noreferrer"
          //style={{ textDecoration: "none", color: "inherit" }}
        >
          https://t.me/marmajdao/17452
        </a>
      </p>
    </div>
    <p>
      Interested in joining Marma J Labs? Please check out our internship
      posting below:
    </p>
    <div className="mb-3">
      <div className="container border border-info pt-3">
        <Markdown text={jobPostingMarkdown} />
      </div>
    </div>
  </div>
);
