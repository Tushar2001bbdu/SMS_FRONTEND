import React from 'react'

export default function ExamAlert() {
    return (
        <div>

            <div
                data-dialog-backdrop="dialog"
                data-dialog-backdrop-close="true"
                class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
            >
                <div
                    data-dialog="dialog"
                    class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
                >
                    <div class="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
                        Some suspicious activity has been detected .Kindly Wait.
                    </div>

                    <div class="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                        <button data-dialog-close="true" class="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            Cancel
                        </button>
                        <button data-dialog-close="true" class="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
