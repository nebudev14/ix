// Floating modal type thing
import { Fragment, useState } from "react";
import { Transition, Dialog, RadioGroup } from "@headlessui/react";

// TODO: client side validation
export default function Setup({ setInitialized }) {
  const [isOpen, setIsOpen] = useState(true);
  const [osis, setOsis] = useState("");
  const [experience, setExperience] = useState("BEGINNER");
  const [year, setYear] = useState("");
  const [confirmation, setConfirmation] = useState("NO");
  const [discord, setDiscord] = useState("");
  const [hasTeam, setHasTeam] = useState(undefined);
  const [team, setTeam] = useState("");
  const [shouldMatch, setShouldMatch] = useState(undefined);
  const experienceLevels = ["None", "Beginner", "Intermediate", "Advanced"];
  const graduationYears = ["2023", "2024", "2025", "2026"];
  const confirmations = ["YES", "NO"];

  // We gotta use Formik or something
  const isValid = () => {
    return (
      experience &&
      !isNaN(year) &&
      confirmation == "YES" &&
      osis.length == 9 &&
      !isNaN(osis) &&
      validUsername(discord) &&
      validTeamSetup()
    );
  };

  const validTeamSetup = () => {
    if (hasTeam === undefined) {
      return false;
    }
    if (hasTeam === false && shouldMatch === undefined) {
      return false;
    }
    if (hasTeam === true && team.length == 0) {
      return false;
    }
    return true;
  };

  const validUsername = (username) => {
    if (username.length == 0) {
      return false;
    }
    const regex = /^.{2,32}#\d{4}$/;
    return regex.test(username);
  };

  // to be updated
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    
    if (hasTeam === true) {
      setShouldMatch(null)
    }

    const body = JSON.stringify({
      osis,
      experience,
      year,
      discordHandle: discord,
      hasTeam,
      shouldMatchTeam: shouldMatch,
      teamMembers: team.split(", ").map((name) => name.trim()),
    });
    console.log(body)
    const res = await fetch("/api/user/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (res.status == 201) {
      console.log(await res.json());
      setInitialized(true);
    }
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        {/* lol */}
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto font-montserrat">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h2" className="text-2xl font-medium leading-6 text-white mb-6">
                    First-time Setup
                  </Dialog.Title>
                  <div className="mt-2 text-neutral-300">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <label className="block text-base text-neutral-400" htmlFor="osis">
                        OSIS:
                      </label>
                      <input
                        className="mt-1 mb-4 block text-xl p-2 rounded-md bg-neutral-700 focus:outline-none shadow-lg focus:ring focus:border-teal-600 focus:ring-teal-500"
                        type="text"
                        value={osis}
                        id="osis"
                        name="osis"
                        onInput={(e) => setOsis(e.target.value)}
                        autoComplete="OSIS"
                      />
                      <RadioGroup value={experience} onChange={setExperience}>
                        <RadioGroup.Label>
                          <p className="mb-2 text-neutral-400">What is your level of programming experience?</p>
                        </RadioGroup.Label>
                        <div className="space-y-2">
                          {experienceLevels.map((experience, index) => (
                            <RadioGroup.Option
                              className={({ checked }) =>
                                `${
                                  checked ? "bg-teal-600" : "bg-neutral-700"
                                } cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                              }
                              key={index}
                              id={experience.toLowerCase()}
                              name="experience"
                              value={experience.toUpperCase()}
                            >
                              <span>{experience}</span>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                      <RadioGroup value={year} onChange={setYear}>
                        <RadioGroup.Label>
                          <p className="mb-2 text-neutral-400">Graduation Year</p>
                        </RadioGroup.Label>
                        <div className="space-y-2">
                          {graduationYears.map((year, index) => (
                            <RadioGroup.Option
                              className={({ checked }) =>
                                `${
                                  checked ? "bg-teal-600" : "bg-neutral-700"
                                } cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                              }
                              key={index}
                              id={year.toLowerCase()}
                              name="year"
                              value={+year}
                            >
                              <span>{year}</span>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                      <RadioGroup value={confirmation} onChange={setConfirmation}>
                        <RadioGroup.Label>
                          <p className="mb-2 text-neutral-400">
                            Do you agree to the terms of the{" "}
                            <a
                              target="_blank"
                              className="underline underline-offset-4 decoration-2 text-green-500"
                              href="https://docs.google.com/document/d/1fMx-8iApjgRuAs0mH2T4yCz6WGrwTwNGHS854C-fmKQ/edit"
                            >
                              Bronx Science AtomHacks Code of Conduct?
                            </a>{" "}
                            If you do not agree to these terms, you may not participate in this event.
                          </p>
                        </RadioGroup.Label>
                        <div className="space-y-2">
                          {confirmations.map((option, index) => (
                            <RadioGroup.Option
                              className={({ checked }) =>
                                `${
                                  checked ? "bg-teal-600" : "bg-neutral-700"
                                } cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                              }
                              key={index}
                              id={option.toLowerCase()}
                              name="confirmation"
                              value={option}
                            >
                              <span>{option}</span>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                      <div className="bg-neutral-700 rounded-md p-4 space-y-4">
                        <h1 className="text-2xl">Information Regarding Discord</h1>
                        <p>
                          We will be using Discord for communications throughout the hackathon. Discord will be used if
                          you plan on working in a team, and will also be used to give updates throughout the day. If
                          you do not have a Discord account, please sign up{" "}
                          <a
                            target="_blank"
                            className="underline underline-offset-4 decoration-2 text-green-500"
                            href="https://discord.com/register"
                          >
                            here.
                          </a>
                        </p>
                        <p>Once you make your Discord account, find your name and four-digit number: </p>
                        <p>
                          If you are on desktop, you can find your name on the bottom left. Below your name will be #,
                          followed by your four-digit number. If you are on mobile, click on your profile picture on the
                          bottom right of the app. On the top should be your name, followed by your four-digit number.
                        </p>
                      </div>
                      <label className="block text-base text-neutral-400" htmlFor="discord">
                        Discord Username with tag (e.g. Guy#1234)
                      </label>
                      <input
                        className="mt-1 mb-4 block text-xl p-2 rounded-md bg-neutral-700 focus:outline-none shadow-lg focus:ring focus:border-teal-600 focus:ring-teal-500"
                        type="text"
                        id="discord"
                        name="discord"
                        value={discord}
                        onInput={(e) => setDiscord(e.target.value)}
                      />
                      <RadioGroup value={hasTeam} onChange={setHasTeam}>
                        <RadioGroup.Label>
                          <p className="mb-2 text-neutral-400">Do you have a team?</p>
                        </RadioGroup.Label>
                        <div className="space-y-2">
                          {/* LOL */}
                          {[true, false].map((option, index) => (
                            <RadioGroup.Option
                              className={({ checked }) =>
                                `${
                                  checked ? "bg-teal-600" : "bg-neutral-700"
                                } cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                              }
                              key={index}
                              id={option ? "yes" : "no"}
                              name="hasTeam"
                              value={option}
                            >
                              <span>{option ? "Yes" : "No"}</span>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                      {typeof hasTeam === "boolean" && hasTeam === true && (
                        <>
                          <label className="block text-base text-neutral-400" htmlFor="team">
                            Who is on your team? (Doesn't have to be final). Please separate names with commas and a space. e.g. Guy, John, Bob
                          </label>
                          <input
                            className="mt-1 mb-4 block text-xl p-2 rounded-md bg-neutral-700 focus:outline-none shadow-lg focus:ring focus:border-teal-600 focus:ring-teal-500"
                            type="text"
                            id="team"
                            name="team"
                            value={team}
                            onInput={(e) => setTeam(e.target.value)}
                          />
                        </>
                      )}
                      {typeof hasTeam === "boolean" && hasTeam === false && (
                        <>
                          <RadioGroup value={shouldMatch} onChange={setShouldMatch}>
                            <RadioGroup.Label>
                              <p className="mb-2 text-neutral-400">
                                Would you like us to match you with a team? (We will match you with others who do not
                                have a team)
                              </p>
                            </RadioGroup.Label>
                            <div className="space-y-2">
                              {[true, false].map((option, index) => (
                                <RadioGroup.Option
                                  className={({ checked }) =>
                                    `${
                                      checked ? "bg-teal-600" : "bg-neutral-700"
                                    } cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                                  }
                                  key={index}
                                  id={option ? "yes" : "no"}
                                  name="shouldMatch"
                                  value={option}
                                >
                                  <span>{option ? "Yes" : "No"}</span>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </>
                      )}
                      <div className="mt-4">
                        <button
                          type="submit"
                          disabled={isValid() ? false : true}
                          className="transition duration-200 inline-flex justify-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-teal-600"
                          onClick={() => setIsOpen(false)}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
