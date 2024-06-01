import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleCheck,
	faPlus,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
	const [todo, setTodo] = useState([]);
	const todoDone = todo.filter((item) => item.checked).length;

	const popUpForm = async () => {
		const { value: data } = await Swal.fire({
			title: "Add To Do",
			input: "text",
			inputPlaceholder: "Add New To Do",
			showCancelButton: true,
		});
		if (data) {
			setTodo((prevData) => [...prevData, { text: data, checked: false }]);
		}
	};

	const deleteTodo = (index) => {
		Swal.fire({
			title: "Delete To Do?",
			showDenyButton: true,
			confirmButtonText: "Delete",
			denyButtonText: `Cancel`,
		}).then((result) => {
			if (result.isConfirmed) {
				setTodo((prevTodo) => prevTodo.filter((_, i) => i !== index));
			}
		});
	};

	const done = (index) => {
		setTodo((prevTodo) =>
			prevTodo.map((item, i) =>
				i === index ? { ...item, checked: !item.checked } : item
			)
		);
	};

	return (
		<div className="mx-48 my-8 ">
			<Navbar />
			<main className="flex justify-center items-center gap-4 mx-auto text-center px-4 py-8 text-2xl mb-6 text-gray-300 border border-green-500 rounded-lg max-w-sm font-semibold">
				<div>
					<h1 className="mb-2">
						Tasks
						<br />
						Done
					</h1>
				</div>
				<h1 className="text-6xl">
					{todoDone}/{todo.length}
				</h1>
			</main>
			<button
				className="border border-green-400 rounded-md bg-green-600 text-white hover:bg-green-800 px-5 py-3 mb-6"
				onClick={popUpForm}
			>
				<FontAwesomeIcon icon={faPlus} className="pr-2" />
				Add To Do
			</button>

			<div className="grid grid-cols-1 gap-2">
				{todo.length > 0 ? (
					todo.map((item, index) => (
						<div
							className="text-black group relative block w-full h-12"
							key={index}
						>
							<span className="absolute inset-0 border-2 border-dashed border-black"></span>
							<div className="relative flex h-full transform items-center justify-between border-2 border-gray-950 bg-gray-100 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 text-base">
								<div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 max-w-full">
									<h2 className="mt-4 font-medium">{item.text}</h2>
								</div>
								<div className="absolute p-4 pt-0 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
									<h3 className="mt-4 font-medium">{item.text}</h3>
								</div>
								{/* Section Checklist and Delete */}
								<section className="pr-4 text-xl">
									{/* Checklist */}
									<button
										className={
											item.checked
												? "mr-3 text-green-600"
												: "mr-3 text-gray-600"
										}
										onClick={() => done(index)}
									>
										<FontAwesomeIcon icon={faCircleCheck} />
									</button>
									{/* Delete */}
									<button
										className=" text-red-600"
										onClick={() => deleteTodo(index)}
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</section>
							</div>
						</div>
					))
				) : (
					<p className="text-gray-500">No todos yet.</p>
				)}
			</div>
		</div>
	);
};

export default App;
