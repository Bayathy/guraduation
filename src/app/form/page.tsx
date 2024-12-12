import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { CodeSample } from "@/components/form/code-sample";
import { ExamForm } from "@/components/form/exam-form";
import { Button } from "@/components/ui/button";

const code = `#include <iostream>
#include <string>

using namespace std;

class Student
{
private:
  string name;   // 名前
  int age;       // 年齢
  int studentID; // 学籍番号（整数型）

public:
  void setData(string name, int age, int studentID)
  {
    this->name = name;
    this->age = age;
    this->studentID = studentID;
  }

  void displayData() const
  {
    cout << name << " " << age << " " << studentID << endl;
  }

  int getAge() const
  {
    return this->age;
  }

  void copyFrom(const Student &other)
  {
    this->name = other.name;
    this->age = other.age;
    this->studentID = other.studentID;
  }
};

// バブルソートの実装
void bubbleSort(Student students[], int size)
{
  for (int i = 0; i < size - 1; ++i)
  {
    for (int j = 0; j < size - i - 1; ++j)
    {
      if (students[j].getAge() > students[j + 1].getAge())
      {
        Student temp(/*空欄1*/);
        temp.copyFrom(students[j]);
        students[j].copyFrom(/*空欄2*/);
        students[j + 1].copyFrom(temp);
      }
    }
  }
}

int main()
{
  int NUM_STUDENTS; // 学生の人数
  cin >> NUM_STUDENTS;

  Student students[/*空欄3*/];

  // データをセットするメンバ関数
  for (int i = 0; i < NUM_STUDENTS; ++i)
  {
    string name;
    int age, studentID;
    cin >> name >> age >> studentID;
    students[i].setData(/*空欄4*/, age, studentID); 
  }

  // 学生のデータをソートする
  bubbleSort(/*空欄5*/, NUM_STUDENTS); 

  // ソートした後のデータを表示
  for (int i = 0; i < NUM_STUDENTS; i++)
  {
    students[i].displayData();
  }

  return 0;
}`;

export default async function Analytics() {
	const session = await auth();

	return (
		<div className="grid h-dvh grid-rows-[auto_1fr] bg-background">
			<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
				<Button aria-label="Back to chat" variant="outline" className="w-fit" asChild>
					<Link href="/">
						<ArrowLeft />
						Back to chat
					</Link>
				</Button>
				<h1>終了後アンケート</h1>
			</header>
			<div className="grid size-full max-w-full grid-cols-2 gap-4 overflow-auto p-4">
				<CodeSample example={code} />
				<div>
					<ExamForm />
				</div>
			</div>
		</div>
	);
}
