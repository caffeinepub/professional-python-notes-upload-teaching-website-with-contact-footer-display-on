import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, FileText, Zap } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function LearnPythonPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <section className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            Start Your Python Journey
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">PyNote Academy</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn Python programming from scratch with our comprehensive lessons and share your knowledge 
            by uploading notes. Join a community of learners and contributors.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate({ to: '/notes' })}>
              <FileText className="mr-2 h-5 w-5" />
              Browse Notes
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: '/upload' })}>
              <Code className="mr-2 h-5 w-5" />
              Upload Note
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src="/assets/generated/py-notes-hero.dim_1600x900.png"
            alt="Python Learning Illustration"
            className="w-full rounded-lg shadow-soft"
          />
        </div>
      </section>

      {/* Learning Content */}
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Python Fundamentals</h2>
          <p className="text-muted-foreground">
            Master the basics with our structured lessons
          </p>
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="datatypes">Data Types</TabsTrigger>
            <TabsTrigger value="control">Control Flow</TabsTrigger>
            <TabsTrigger value="functions">Functions</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Python Basics</CardTitle>
                <CardDescription>Get started with Python programming fundamentals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">What is Python?</h3>
                  <p className="text-muted-foreground">
                    Python is a high-level, interpreted programming language known for its simplicity and readability. 
                    It's perfect for beginners and powerful enough for experts.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Your First Program</h3>
                  <p className="mb-2 text-muted-foreground">
                    Let's start with the classic "Hello, World!" program:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">print("Hello, World!")</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Variables</h3>
                  <p className="mb-2 text-muted-foreground">
                    Variables store data values. Python has no command for declaring a variable:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`name = "Alice"
age = 25
is_student = True`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datatypes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Types</CardTitle>
                <CardDescription>Understanding Python's built-in data types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Numbers</h3>
                  <p className="mb-2 text-muted-foreground">
                    Python supports integers, floats, and complex numbers:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`integer = 42
floating = 3.14
complex_num = 2 + 3j`}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Strings</h3>
                  <p className="mb-2 text-muted-foreground">
                    Strings are sequences of characters enclosed in quotes:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`single = 'Hello'
double = "World"
multiline = """This is
a multiline string"""`}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Lists and Tuples</h3>
                  <p className="mb-2 text-muted-foreground">
                    Lists are mutable, tuples are immutable:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`my_list = [1, 2, 3, "four"]
my_tuple = (1, 2, 3, "four")`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="control" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Control Flow</CardTitle>
                <CardDescription>Making decisions and repeating actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">If Statements</h3>
                  <p className="mb-2 text-muted-foreground">
                    Execute code based on conditions:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`age = 18
if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")`}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">For Loops</h3>
                  <p className="mb-2 text-muted-foreground">
                    Iterate over sequences:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)`}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">While Loops</h3>
                  <p className="mb-2 text-muted-foreground">
                    Repeat while a condition is true:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`count = 0
while count < 5:
    print(count)
    count += 1`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="functions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Functions</CardTitle>
                <CardDescription>Organizing code into reusable blocks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Defining Functions</h3>
                  <p className="mb-2 text-muted-foreground">
                    Functions are defined using the <code className="prose-code">def</code> keyword:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # Output: Hello, Alice!`}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Parameters and Arguments</h3>
                  <p className="mb-2 text-muted-foreground">
                    Functions can accept multiple parameters with default values:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`def add(a, b=0):
    return a + b

print(add(5, 3))  # Output: 8
print(add(5))     # Output: 5`}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Lambda Functions</h3>
                  <p className="mb-2 text-muted-foreground">
                    Small anonymous functions for simple operations:
                  </p>
                  <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                    <code className="text-sm font-mono">{`square = lambda x: x ** 2
print(square(5))  # Output: 25`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg bg-primary/5 p-8 text-center">
        <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="mb-3 text-2xl font-bold">Ready to Share Your Knowledge?</h2>
        <p className="mb-6 text-muted-foreground">
          Upload your Python notes and help others learn. Browse community notes for more insights.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => navigate({ to: '/upload' })}>
            Upload Your Note
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate({ to: '/notes' })}>
            Browse All Notes
          </Button>
        </div>
      </section>
    </div>
  );
}
