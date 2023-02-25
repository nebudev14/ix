// Floating modal type thing
import { Fragment, useState } from "react";
import { Transition, Dialog, RadioGroup } from "@headlessui/react";

// TODO: client side validation
export default function Setup({ setInitialized }) {
  const [isOpen, setIsOpen] = useState(true);
  const [experience, setExperience] = useState("BEGINNER");
  const experienceLevels = ["Beginner", "Intermediate", "Advanced"];
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.osis);
    console.log(experience);
    // ideally some sort of red error box
    if (!e.target.osis || !experience) {
      return;
    }
    const body = JSON.stringify({
      osis: e.target.osis.value,
      experience: experience,
      initialized: true,
    });
    const res = await fetch("/api/user/update-info", {
      method: "PUT",
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
                    <form onSubmit={handleSubmit}>
                      <label className="block text-base text-neutral-400" htmlFor="osis">
                        OSIS:
                      </label>
                      <input
                        className="mt-1 mb-4 block text-xl p-2 rounded-md bg-neutral-700 focus:outline-none shadow-lg focus:ring focus:border-teal-600 focus:ring-teal-500"
                        type="text"
                        id="osis"
                        name="osis"
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
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="transition duration-200 inline-flex justify-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
