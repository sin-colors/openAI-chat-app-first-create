This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

RegisterFormのnameフィールドに入力しようとしてフォーカスを当てたら、以下のようなエラーが出ました。
A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components
このエラーは何が原因で発生してますか？
また、どのように修正したら問題を解決できますか？

このエラー「A component is changing an uncontrolled input to be controlled」は、Reactのフォーム要素（`<input>`など）が、コンポーネントのライフサイクル中に「uncontrolled」から「controlled」に切り替わったときに発生します。

**原因:**

`react-hook-form` を使用している場合、このエラーの一般的な原因は、フォームのデフォルト値が `undefined` または `null` であることです。`react-hook-form` は、初期レンダリング時にこれらの値を「uncontrolled」と見なし、その後、フォームが値を定義すると「controlled」に切り替わります。Reactは、コンポーネントのライフサイクル中にこの切り替えが行われることを好ましくないと考えているため、この警告を発します。

あなたのコードの場合、`useForm` の `defaultValues` オプションが設定されていないため、`name`, `email`, `password` フィールドの初期値は `undefined` となっています。

**解決方法:**

`useForm` の `defaultValues` オプションを使用して、すべてのフォームフィールドに初期値を設定することで、この問題を解決できます。これにより、フォームが最初から「controlled」として扱われるようになります。

以下のように修正してください。

```typescript
// ... (既存のインポート)

function RegisterForm() {
  const form = useForm<ResisterFormValues>({
    resolver: zodResolver(resisterFormSchema),
    // ここにdefaultValuesを追加
    defaultValues: {
      name: "", // 初期値を空文字列に設定
      email: "", // 初期値を空文字列に設定
      password: "", // 初期値を空文字列に設定
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data: ResisterFormValues) => {
          const result = await userRegister(data);
          if (result.success) {
            toast.success(result.message, { autoClose: 5000 });
            setTimeout(() => router.push("/login"), 5000);
          } else {
            toast.error(result.error || "エラーが発生しました");
          }
        })}
        className="text-zinc-800"
      >
        <h1 className="text-center text-3xl font-bold">ユーザー登録</h1>
        <div className="mt-6 flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full"
                    placeholder="Shingo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="w-full"
                    placeholder="example@ne.jp"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-md min-w-xs items-center gap-1.5">
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full"
                    placeholder="８文字以上の英数字"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 w-full">
          <Button
            className="w-full bg-zinc-800 py-5 text-lg tracking-widest hover:bg-zinc-700/85"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中" : "登録"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default RegisterForm;
```

**解説:**

- `defaultValues: { name: "", email: "", password: "" }` を `useForm` の設定に追加することで、フォームがレンダリングされる際に、`name`, `email`, `password` の各フィールドが最初から空文字列という明確な値を持つことになります。
- これにより、Reactはこれらの入力要素を最初から「controlled」として認識し、`undefined` から定義された値への切り替えが発生しなくなるため、エラーが解消されます。

この修正で問題が解決するはずです。

---

---

このような仕組みは以前からあったのでしょうか？それとも最近できたのでしょうか？

「A component is changing an uncontrolled input to be controlled」というエラーメッセージが示す仕組み（Reactのフォーム要素の制御と非制御に関する概念）は、**Reactがリリースされた当初から存在する基本的な概念**です。

これは最近できたものではなく、Reactの設計思想の中核をなすものであり、Reactのフォームを扱う上で非常に重要な考え方です。

**補足説明:**

- **制御コンポーネント (Controlled Components):** Reactにおいて、フォームの入力要素（`<input>`, `<textarea>`, `<select>` など）の値をReactのstateによって制御するコンポーネントです。ユーザーが入力するたびにstateを更新し、入力要素の`value`プロパティにそのstateをバインドします。これにより、入力要素の値は常にReactのstateによって「制御」されます。
- **非制御コンポーネント (Uncontrolled Components):** フォームの入力要素の値をDOM自体に任せるコンポーネントです。従来のHTMLフォームのように、入力要素が自身の内部状態を保持します。Reactでは、`ref`を使ってDOMから直接値を取得したり、初期値は`defaultValue`プロパティで設定します。

Reactは、入力要素の`value`プロパティが`undefined`または`null`で初期化された場合、それを「非制御」とみなします。しかし、その後、`value`プロパティが（例えば`react-hook-form`によって）有効な文字列（`""`など）に変わると、Reactはそれを「制御」しようとします。この「非制御から制御への切り替え」をReactは問題視し、警告を発します。

`react-hook-form`のようなライブラリを使用する場合でも、その内部でReactの制御/非制御コンポーネントの概念に基づいて入力要素を扱っています。そのため、`defaultValues`を適切に設定することで、最初からすべての入力要素が「制御された」状態であることをReactに明示し、この警告を回避することができます。

要するに、この概念はReactの基礎であり、新しいものではありません。

---

---

以前に書いたコンポーネントではnameフィールドにフォーカスをあててもエラーは発生しなかったと思います。このコンポーネントでも初期値は設定してないと思うのですが、なぜエラーが発生しなかったのですか？（React Hook FormとZodのみ）

以前のコンポーネントで `name` フィールドにフォーカスを当ててもエラーが発生しなかったのは、`react-hook-form` の使用方法が異なっていたためです。

**以前のコード:**

```jsx
// ...
import { Input } from "./ui/input"; // shadcn/ui の Input コンポーネント
// ...
<Input
  type="text"
  id="name"
  placeholder="山田　太郎"
  className="w-full"
  {...register("name")} // ここがポイント
/>;
{
  errors.name && <p>{errors.name.message}</p>;
}
// ...
```

**現在のコード:**

```jsx
// ...
import { Input } from "./ui/input"; // shadcn/ui の Input コンポーネント
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"; // shadcn/ui の Form コンポーネント
// ...
<FormField
  control={form.control}
  name="name"
  render={(
    { field }, // ここがポイント
  ) => (
    <FormItem className="min-w-xs grid w-full max-w-md items-center gap-1.5">
      <FormLabel>名前</FormLabel>
      <FormControl>
        <Input
          type="text"
          className="w-full"
          placeholder="Shingo"
          {...field} // ここがポイント
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>;
// ...
```

### なぜ以前のコードではエラーが出なかったのか？

以前のコードでは、`react-hook-form` の `register` 関数を直接 `<Input>` コンポーネントにスプレッド (`{...register("name")}`) していました。

`register("name")` が返すオブジェクトには、主に以下のプロパティが含まれています。

- `name`: "name"
- `onChange`: フォームの変更を処理する関数
- `onBlur`: フォーカスが外れたときに処理する関数
- `ref`: DOM要素への参照

**重要なのは、`register()` が返すオブジェクトには `value` プロパティが**デフォルトでは含まれていない**という点です。**

これにより、何が起こるかというと：

1.  `<Input {...register("name")} />` がレンダリングされる際、`Input` コンポーネントには `value` プロパティが明示的に渡されません。
2.  `Input` コンポーネント（おそらく `shadcn/ui` の `Input`）は、`value` プロパティが渡されない場合、内部的にHTMLの `<input>` 要素に `value` を指定しない、または `defaultValue` を使用するような挙動をします。
3.  結果として、Reactはこの `<Input>` 要素を最初から**非制御コンポーネント**として扱います。
4.  `react-hook-form` は、内部的に `register` 関数を通じてこれらの非制御の入力要素から値を監視し、フォームの状態を管理します。
5.  非制御コンポーネントとして一貫して扱われているため、「非制御から制御への切り替え」が発生せず、エラーも発生しなかったのです。

### 現在のコードでエラーが出た理由（再確認）

現在のコードでは、`shadcn/ui` の `Form`, `FormField`, `FormControl` を使用しています。

`FormField` の `render` プロップに渡される `field` オブジェクトには、`react-hook-form` の `control` オブジェクトを介して、**現在のフォームの状態に対応する `value` プロパティが常に含まれています**。

そのため、`Input {...field}` とすると、`Input` コンポーネントには常に `value` プロパティが渡されます。

1.  `useForm` を `defaultValues` なしで初期化すると、`name` フィールドの内部的な値は `undefined`。
2.  `FormField` の `render` に渡される `field.value` も `undefined`。
3.  `<Input {...field} />` がレンダリングされる際、`<Input value={undefined} ... />` のような形で渡される。
4.  Reactは `value={undefined}` を見て、この入力要素を**非制御コンポーネント**と認識する。
5.  しかし、`react-hook-form` と `shadcn/ui` の `Form` コンポーネントの連携により、`field` オブジェクトは最終的に入力要素を**制御コンポーネント**として扱おうとします。つまり、`undefined` だった `value` を、ユーザーが入力する準備ができた時点で有効な値（空文字列など）に切り替えようとします。
6.  この「非制御から制御への切り替え」をReactが検知し、警告が出た、というのが現在のコードでエラーが発生したメカニズムです。

### まとめ

- **以前のコード:** `register` 関数を直接使用し、`value` プロパティが明示的に渡されなかったため、Reactは入力要素を最初から非制御コンポーネントとして扱い、エラーは出ませんでした。
- **現在のコード:** `FormField` と `field` オブジェクトを使用することで、`value` プロパティが常に `<Input>` に渡されます。`defaultValues` がない場合、初期の `value` が `undefined` となり、その後制御コンポーネントとして動作しようとするため、非制御から制御への切り替えが発生しエラーが出ました。

`shadcn/ui` の `Form` コンポーネントを使う場合は、`react-hook-form` の `useForm` に `defaultValues` を設定し、`field.value` が常に定義された値（空文字列など）になるようにすることが推奨されます。
