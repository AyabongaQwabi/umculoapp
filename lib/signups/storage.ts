import { Redis } from "@upstash/redis";
import type { Signup } from "@/lib/signups/types";
import {
  SIGNUPS_ALL_KEY,
  signupKey,
} from "@/lib/signups/types";

function getRedis(): Redis {
  return Redis.fromEnv();
}

export async function saveSignup(signup: Signup): Promise<void> {
  const redis = getRedis();
  await redis.set(signupKey(signup.id), signup);
  await redis.lpush(SIGNUPS_ALL_KEY, signup.id);
}

export async function getSignup(id: string): Promise<Signup | null> {
  const redis = getRedis();
  return redis.get<Signup>(signupKey(id));
}

export async function updateSignup(
  id: string,
  patch: Partial<Pick<Signup, "status" | "yocoCheckoutId">>,
): Promise<Signup | null> {
  const existing = await getSignup(id);
  if (!existing) return null;

  const updated: Signup = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  const redis = getRedis();
  await redis.set(signupKey(id), updated);
  return updated;
}

export async function fetchAllSignups(): Promise<Signup[]> {
  const redis = getRedis();
  const ids = await redis.lrange<string>(SIGNUPS_ALL_KEY, 0, -1);
  if (!ids.length) return [];

  const signups = await Promise.all(ids.map((id) => getSignup(id)));
  const records = signups.filter((signup): signup is Signup => signup !== null);

  const seen = new Set<string>();
  const unique = records.filter((signup) => {
    if (seen.has(signup.id)) return false;
    seen.add(signup.id);
    return true;
  });

  return unique.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
